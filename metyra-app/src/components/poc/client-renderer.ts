/**
 * Client-side runtime renderer for parsed rich blocks.
 *
 * Mirrors the server-side `.astro` components — same Tailwind classes, same SVG
 * geometry. Lives in the browser so we can swap the viewer's innerHTML after
 * the LLM stream finishes, without a server round-trip.
 *
 * Returns HTML strings (concatenated, escaped where appropriate). Strict on
 * data shape; missing fields → block silently skipped.
 */

import type { Block, Section } from './parser';
import { groupKpiCards } from './parser';

/* ---------- palette + helpers (mirrors chart-utils.ts) ---------- */

const PALETTE = ['#16467D', '#059669', '#EA580C', '#3A7DBE', '#10B981', '#FB923C', '#B45309'];
const AXIS = '#64748B';
const GRID = '#E2E8F0';

function esc(s: any): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return String(n);
  if (Math.abs(n) >= 1000) return n.toLocaleString('pl-PL');
  if (Number.isInteger(n)) return String(n);
  return n.toLocaleString('pl-PL', { maximumFractionDigits: 1 });
}

function niceTicks(min: number, max: number, count = 5): number[] {
  if (min === max) return [min];
  const range = max - min;
  const rough = range / (count - 1);
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / pow;
  const step = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
  const tick = step * pow;
  const start = Math.floor(min / tick) * tick;
  const end = Math.ceil(max / tick) * tick;
  const out: number[] = [];
  for (let v = start; v <= end + 1e-9; v += tick) out.push(+v.toFixed(6));
  return out;
}

function arcPath(cx: number, cy: number, r0: number, r1: number, a0deg: number, a1deg: number): string {
  const a0 = (a0deg * Math.PI) / 180;
  const a1 = (a1deg * Math.PI) / 180;
  const x0 = cx + r1 * Math.cos(a0);
  const y0 = cy + r1 * Math.sin(a0);
  const x1 = cx + r1 * Math.cos(a1);
  const y1 = cy + r1 * Math.sin(a1);
  const xi0 = cx + r0 * Math.cos(a1);
  const yi0 = cy + r0 * Math.sin(a1);
  const xi1 = cx + r0 * Math.cos(a0);
  const yi1 = cy + r0 * Math.sin(a0);
  const large = a1deg - a0deg > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L ${xi0} ${yi0} A ${r0} ${r0} 0 ${large} 0 ${xi1} ${yi1} Z`;
}

/* ---------- inline markdown ---------- */

function inlineMd(t: string): string {
  return esc(t)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function blockMd(text: string): string {
  const paragraphs = text.split(/\n\s*\n/);
  return paragraphs
    .map((para) => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      if (/^[-*]\s+/.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .filter((l) => /^[-*]\s+/.test(l.trim()))
          .map((l) => `<li>${inlineMd(l.trim().replace(/^[-*]\s+/, ''))}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .filter((l) => /^\d+\.\s+/.test(l.trim()))
          .map((l) => `<li>${inlineMd(l.trim().replace(/^\d+\.\s+/, ''))}</li>`)
          .join('');
        return `<ol>${items}</ol>`;
      }
      return `<p>${inlineMd(trimmed.replace(/\n/g, ' '))}</p>`;
    })
    .filter(Boolean)
    .join('');
}

/* ---------- block renderers ---------- */

function renderMarkdown(content: string): string {
  return `<div class="poc-prose text-sm leading-relaxed text-ink-700">${blockMd(content)}</div>`;
}

function renderReportHeader(d: any, eyebrowLabel: string): string {
  if (!d) return '';
  const stats = (d.stats ?? []) as Array<{ label: string; value: string }>;
  const statsHtml = stats.length
    ? `<div class="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">${stats
        .map(
          (s) => `
        <div class="rounded-xl border border-ink-200 bg-white/80 px-3 py-2.5 backdrop-blur">
          <div class="text-[10px] font-semibold uppercase tracking-wider text-ink-500">${esc(s.label)}</div>
          <div class="mt-0.5 text-base font-bold text-ink-900">${esc(s.value)}</div>
        </div>`,
        )
        .join('')}</div>`
    : '';

  return `<div class="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 shadow-sm">
    <div aria-hidden="true" class="bg-dots-emerald pointer-events-none absolute inset-0 opacity-40"></div>
    <div class="relative flex flex-wrap items-start justify-between gap-4">
      <div>
        <div class="text-xs font-semibold uppercase tracking-wider text-blue-700">${esc(eyebrowLabel)}</div>
        <div class="mt-1 text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">${esc(d.title ?? '')}</div>
        ${d.subtitle ? `<div class="mt-1.5 text-sm text-ink-600">${esc(d.subtitle)}</div>` : ''}
      </div>
      ${
        d.period
          ? `<div class="rounded-full border border-blue-300 bg-white/80 px-3 py-1 text-xs font-semibold text-blue-800 backdrop-blur">${esc(d.period)}</div>`
          : ''
      }
    </div>
    ${statsHtml}
  </div>`;
}

function renderMetricCards(d: any): string {
  if (!d?.cards?.length) return '';
  const toneBar: Record<string, string> = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    neutral: 'bg-ink-400',
  };
  return `<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">${d.cards
    .map(
      (c: any) => `
      <div class="relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
        <div class="absolute inset-x-0 top-0 h-1 ${toneBar[c.tone ?? 'neutral']}"></div>
        <div class="text-[10px] font-semibold uppercase tracking-wider text-ink-500">${esc(c.label)}</div>
        <div class="mt-2 flex items-baseline gap-1.5">
          <span class="text-3xl font-bold tracking-tight text-ink-900">${esc(c.value)}</span>
          ${c.unit ? `<span class="text-sm font-medium text-ink-500">${esc(c.unit)}</span>` : ''}
        </div>
        ${c.caption ? `<div class="mt-2 text-xs text-ink-600">${esc(c.caption)}</div>` : ''}
      </div>`,
    )
    .join('')}</div>`;
}

function sparklineSvg(values: number[], color: string, w = 100, h = 32): string {
  if (!values || values.length < 2) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => `${(i * step).toFixed(2)},${(h - ((v - min) / range) * h).toFixed(2)}`);
  const last = pts[pts.length - 1].split(',');
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="none" aria-hidden="true">
    <polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${last[0]}" cy="${last[1]}" r="2.4" fill="${color}"/>
  </svg>`;
}

function renderKpiCard(d: any): string {
  if (!d) return '';
  const status = d.status ?? 'neutral';
  const dir = d.delta?.direction ?? 'neutral';
  const statusBorder: Record<string, string> = {
    green: 'border-green-200',
    amber: 'border-amber-200',
    red: 'border-red-200',
    neutral: 'border-ink-200',
  };
  const statusDot: Record<string, string> = {
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    neutral: 'bg-ink-300',
  };
  const deltaColor: Record<string, string> = {
    up: 'text-green-700 bg-green-50',
    down: 'text-red-700 bg-red-50',
    neutral: 'text-ink-600 bg-ink-100',
  };
  const sparkColor =
    status === 'green' ? '#059669' : status === 'red' ? '#DC2626' : status === 'amber' ? '#D97706' : '#16467D';
  const arrow = dir === 'up' ? '↑' : dir === 'down' ? '↓' : '−';

  return `<div class="rounded-2xl border ${statusBorder[status]} bg-white p-4 shadow-sm">
    <div class="flex items-start justify-between gap-2">
      <div class="text-[11px] font-semibold uppercase tracking-wider text-ink-500">${esc(d.label ?? '')}</div>
      <span class="h-2 w-2 rounded-full ${statusDot[status]}" title="${esc(status)}"></span>
    </div>
    <div class="mt-2 flex items-baseline gap-1.5">
      <span class="text-2xl font-bold tracking-tight text-ink-900">${esc(d.value ?? '')}</span>
      ${d.unit ? `<span class="text-xs font-medium text-ink-500">${esc(d.unit)}</span>` : ''}
    </div>
    <div class="mt-3 flex items-center justify-between gap-2">
      ${
        d.delta?.value
          ? `<span class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${deltaColor[dir]}">
              <span aria-hidden="true">${arrow}</span>${esc(d.delta.value)}${d.delta.label ? `<span class="ml-0.5 font-normal opacity-80">${esc(d.delta.label)}</span>` : ''}
            </span>`
          : ''
      }
      ${d.spark && d.spark.length >= 2 ? sparklineSvg(d.spark, sparkColor) : ''}
    </div>
    ${d.caption ? `<div class="mt-2 text-[11px] text-ink-500">${esc(d.caption)}</div>` : ''}
  </div>`;
}

function renderDonut(d: any): string {
  const items = ((d?.data ?? []) as Array<{ name: string; value: number }>).filter(
    (x) => typeof x.value === 'number',
  );
  if (items.length === 0) return '';
  const total = items.reduce((a, b) => a + b.value, 0) || 1;
  const CX = 100, CY = 100, R0 = 58, R1 = 92;
  let a = -90;
  const slices = items.map((it, i) => {
    const sweep = (it.value / total) * 360;
    const end = a + sweep;
    const path = arcPath(CX, CY, R0, R1, a, end);
    const mid = (((a + end) / 2) * Math.PI) / 180;
    const labelR = (R0 + R1) / 2;
    const lx = CX + labelR * Math.cos(mid);
    const ly = CY + labelR * Math.sin(mid);
    const color = PALETTE[i % PALETTE.length];
    const percent = ((it.value / total) * 100).toFixed(1);
    const s = { path, color, name: it.name, value: it.value, percent, lx, ly };
    a = end;
    return s;
  });
  const unit = d.unit ?? '%';
  const svgInner = slices
    .map(
      (s) => `
    <g>
      <path d="${s.path}" fill="${s.color}" stroke="white" stroke-width="2"><title>${esc(s.name)}: ${esc(s.value)}${esc(unit)}</title></path>
      ${parseFloat(s.percent) >= 6 ? `<text x="${s.lx}" y="${s.ly}" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="600" fill="white">${s.percent}${esc(unit)}</text>` : ''}
    </g>`,
    )
    .join('');
  const legend = slices
    .map(
      (s) => `
    <li class="flex items-center justify-between gap-3 text-sm">
      <span class="flex items-center gap-2 truncate"><span class="h-3 w-3 flex-shrink-0 rounded-sm" style="background:${s.color}"></span><span class="truncate text-ink-700">${esc(s.name)}</span></span>
      <span class="tabular-nums font-medium text-ink-900">${esc(s.value)}${esc(unit)}</span>
    </li>`,
    )
    .join('');
  return `<div class="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
    ${d.title ? `<div class="mb-3 text-sm font-semibold text-ink-900">${esc(d.title)}</div>` : ''}
    <div class="grid items-center gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
      <svg viewBox="0 0 200 200" class="mx-auto h-56 w-56" role="img" aria-label="${esc(d.title ?? '')}">${svgInner}</svg>
      <ul class="space-y-1.5">${legend}</ul>
    </div>
  </div>`;
}

function renderBar(d: any): string {
  const rows = (d?.data ?? []) as Array<Record<string, any>>;
  const series = (d?.series ?? []) as string[];
  if (rows.length === 0 || series.length === 0) return '';
  const W = 720, H = 320;
  const PADDING = { top: 16, right: 16, bottom: 48, left: 56 };
  const innerW = W - PADDING.left - PADDING.right;
  const innerH = H - PADDING.top - PADDING.bottom;
  let minV = Infinity, maxV = -Infinity;
  for (const r of rows) for (const s of series) {
    const v = Number(r[s] ?? 0);
    if (!isNaN(v)) { if (v < minV) minV = v; if (v > maxV) maxV = v; }
  }
  if (!isFinite(minV)) { minV = 0; maxV = 1; }
  if (minV > 0) minV = 0;
  const ticks = niceTicks(minV, maxV, 5);
  const yMin = ticks[0], yMax = ticks[ticks.length - 1];
  const yScale = (v: number) => PADDING.top + innerH - ((v - yMin) / (yMax - yMin || 1)) * innerH;
  const groupCount = rows.length;
  const groupWidth = innerW / groupCount;
  const barGap = 4;
  const barWidth = Math.max(8, (groupWidth - barGap * (series.length + 1)) / series.length);

  const ticksSvg = ticks
    .map(
      (t) =>
        `<g><line x1="${PADDING.left}" x2="${W - PADDING.right}" y1="${yScale(t)}" y2="${yScale(t)}" stroke="${GRID}" stroke-dasharray="${t === 0 ? '' : '3 3'}"/><text x="${PADDING.left - 8}" y="${yScale(t) + 4}" text-anchor="end" font-size="11" fill="${AXIS}">${fmt(t)}</text></g>`,
    )
    .join('');
  const barsSvg = rows
    .map((r, gi) => {
      const groupX = PADDING.left + gi * groupWidth;
      const bars = series
        .map((s, si) => {
          const v = Number(r[s] ?? 0);
          const y = yScale(Math.max(v, 0));
          const h = Math.abs(yScale(0) - yScale(v));
          const x = groupX + barGap + si * (barWidth + barGap);
          const color = PALETTE[si % PALETTE.length];
          return `<rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="3" fill="${color}"><title>${esc(r.category)}: ${esc(s)} = ${fmt(v)}${esc(d.unit ?? '')}</title></rect>`;
        })
        .join('');
      const label = `<text x="${groupX + groupWidth / 2}" y="${H - PADDING.bottom + 18}" text-anchor="middle" font-size="11" fill="${AXIS}">${esc(r.category)}</text>`;
      return `<g>${bars}${label}</g>`;
    })
    .join('');
  const legend = series
    .map(
      (s, i) =>
        `<span class="inline-flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-sm" style="background:${PALETTE[i % PALETTE.length]}"></span>${esc(s)}</span>`,
    )
    .join('');
  return `<div class="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
    ${d.title ? `<div class="mb-3 text-sm font-semibold text-ink-900">${esc(d.title)}</div>` : ''}
    <div class="overflow-x-auto"><svg viewBox="0 0 ${W} ${H}" class="h-80 w-full min-w-[640px]" role="img">${ticksSvg}${barsSvg}</svg></div>
    <div class="mt-3 flex flex-wrap gap-3 text-xs text-ink-600">${legend}</div>
  </div>`;
}

function renderLine(d: any): string {
  const rows = (d?.data ?? []) as Array<Record<string, any>>;
  const series = (d?.series ?? []) as string[];
  if (rows.length === 0 || series.length === 0) return '';
  const W = 720, H = 300;
  const PADDING = { top: 16, right: 16, bottom: 44, left: 56 };
  const innerW = W - PADDING.left - PADDING.right;
  const innerH = H - PADDING.top - PADDING.bottom;
  let minV = Infinity, maxV = -Infinity;
  for (const r of rows) for (const s of series) {
    const v = Number(r[s] ?? 0);
    if (!isNaN(v)) { if (v < minV) minV = v; if (v > maxV) maxV = v; }
  }
  if (!isFinite(minV)) { minV = 0; maxV = 1; }
  const ticks = niceTicks(minV, maxV, 5);
  const yMin = ticks[0], yMax = ticks[ticks.length - 1];
  const step = innerW / Math.max(rows.length - 1, 1);
  const xP = (i: number) => PADDING.left + i * step;
  const yP = (v: number) => PADDING.top + innerH - ((v - yMin) / (yMax - yMin || 1)) * innerH;
  const xTickEvery = rows.length > 8 ? Math.ceil(rows.length / 8) : 1;

  const ticksSvg = ticks
    .map(
      (t) =>
        `<g><line x1="${PADDING.left}" x2="${W - PADDING.right}" y1="${yP(t)}" y2="${yP(t)}" stroke="${GRID}" stroke-dasharray="3 3"/><text x="${PADDING.left - 8}" y="${yP(t) + 4}" text-anchor="end" font-size="11" fill="${AXIS}">${fmt(t)}</text></g>`,
    )
    .join('');
  const xLabels = rows
    .map((r, i) => (i % xTickEvery === 0 ? `<text x="${xP(i)}" y="${H - PADDING.bottom + 16}" text-anchor="middle" font-size="10" fill="${AXIS}">${esc(r.period)}</text>` : ''))
    .join('');
  const linesSvg = series
    .map((s, si) => {
      const color = PALETTE[si % PALETTE.length];
      const points = rows.map((r, i) => `${xP(i)},${yP(Number(r[s] ?? 0))}`).join(' ');
      const dots = rows
        .map(
          (r, i) =>
            `<circle cx="${xP(i)}" cy="${yP(Number(r[s] ?? 0))}" r="2.6" fill="${color}"><title>${esc(r.period)}: ${esc(s)} = ${fmt(Number(r[s] ?? 0))}${esc(d.unit ?? '')}</title></circle>`,
        )
        .join('');
      return `<g><polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>${dots}</g>`;
    })
    .join('');
  const legend = series
    .map(
      (s, i) =>
        `<span class="inline-flex items-center gap-1.5"><span class="h-0.5 w-4" style="background:${PALETTE[i % PALETTE.length]}"></span><span class="font-medium">${esc(s)}</span></span>`,
    )
    .join('');
  return `<div class="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
    ${d.title ? `<div class="mb-3 text-sm font-semibold text-ink-900">${esc(d.title)}</div>` : ''}
    <div class="overflow-x-auto"><svg viewBox="0 0 ${W} ${H}" class="h-72 w-full min-w-[640px]" role="img">${ticksSvg}${xLabels}${linesSvg}</svg></div>
    <div class="mt-3 flex flex-wrap gap-3 text-xs text-ink-600">${legend}</div>
  </div>`;
}

function renderCombo(d: any): string {
  const rows = (d?.data ?? []) as Array<Record<string, any>>;
  if (!d?.bars || !d?.line || rows.length === 0) return '';
  // Validate x_key actually exists in data[0]; fall back to common keys / first string key.
  const sample = rows[0] ?? {};
  let xKey: string = d.x_key;
  if (!xKey || !(xKey in sample)) {
    if ('period' in sample) xKey = 'period';
    else if ('month' in sample) xKey = 'month';
    else xKey = Object.keys(sample).find((k) => typeof sample[k] === 'string') ?? Object.keys(sample)[0];
  }
  const barKey = d.bars.key;
  const lineKey = d.line.key;
  const W = 720, H = 320;
  const PADDING = { top: 16, right: 56, bottom: 48, left: 56 };
  const innerW = W - PADDING.left - PADDING.right;
  const innerH = H - PADDING.top - PADDING.bottom;
  const barVals = rows.map((r) => Number(r[barKey] ?? 0));
  const lineVals = rows.map((r) => Number(r[lineKey] ?? 0));
  const barTicks = niceTicks(Math.min(0, ...barVals), Math.max(...barVals), 5);
  const lineTicks = niceTicks(Math.min(...lineVals), Math.max(...lineVals), 4);
  const byMin = barTicks[0], byMax = barTicks[barTicks.length - 1];
  const lyMin = lineTicks[0], lyMax = lineTicks[lineTicks.length - 1];
  const step = innerW / rows.length;
  const barW = Math.min(40, step * 0.55);
  const yBar = (v: number) => PADDING.top + innerH - ((v - byMin) / (byMax - byMin || 1)) * innerH;
  const yLine = (v: number) => PADDING.top + innerH - ((v - lyMin) / (lyMax - lyMin || 1)) * innerH;
  const xC = (i: number) => PADDING.left + i * step + step / 2;
  const barColor = PALETTE[0];
  const lineColor = PALETTE[2];

  const barTicksSvg = barTicks
    .map(
      (t) =>
        `<g><line x1="${PADDING.left}" x2="${W - PADDING.right}" y1="${yBar(t)}" y2="${yBar(t)}" stroke="${GRID}" stroke-dasharray="3 3"/><text x="${PADDING.left - 8}" y="${yBar(t) + 4}" text-anchor="end" font-size="11" fill="${barColor}">${fmt(t)}</text></g>`,
    )
    .join('');
  const lineTicksSvg = lineTicks
    .map(
      (t) =>
        `<text x="${W - PADDING.right + 8}" y="${yLine(t) + 4}" text-anchor="start" font-size="11" fill="${lineColor}">${fmt(t)}</text>`,
    )
    .join('');
  const barsAndLabels = rows
    .map(
      (r, i) =>
        `<g><rect x="${xC(i) - barW / 2}" y="${yBar(barVals[i])}" width="${barW}" height="${Math.max(0, yBar(0) - yBar(barVals[i]))}" rx="3" fill="${barColor}" opacity="0.85"><title>${esc(r[xKey])}: ${esc(d.bars.label)} = ${fmt(barVals[i])}${d.bars.unit ? ' ' + esc(d.bars.unit) : ''}</title></rect><text x="${xC(i)}" y="${H - PADDING.bottom + 18}" text-anchor="middle" font-size="10" fill="${AXIS}">${esc(r[xKey])}</text></g>`,
    )
    .join('');
  const linePoints = rows.map((_, i) => `${xC(i)},${yLine(lineVals[i])}`).join(' ');
  const dots = rows
    .map(
      (r, i) =>
        `<circle cx="${xC(i)}" cy="${yLine(lineVals[i])}" r="3" fill="${lineColor}"><title>${esc(r[xKey])}: ${esc(d.line.label)} = ${fmt(lineVals[i])}${d.line.unit ? ' ' + esc(d.line.unit) : ''}</title></circle>`,
    )
    .join('');
  return `<div class="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
    ${d.title ? `<div class="mb-3 text-sm font-semibold text-ink-900">${esc(d.title)}</div>` : ''}
    <div class="overflow-x-auto"><svg viewBox="0 0 ${W} ${H}" class="h-80 w-full min-w-[640px]" role="img">
      ${barTicksSvg}${lineTicksSvg}${barsAndLabels}
      <polyline points="${linePoints}" fill="none" stroke="${lineColor}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
      ${dots}
    </svg></div>
    <div class="mt-3 flex flex-wrap gap-4 text-xs text-ink-600">
      <span class="inline-flex items-center gap-1.5"><span class="h-3 w-3 rounded-sm" style="background:${barColor}"></span><span class="font-medium">${esc(d.bars.label)}</span>${d.bars.unit ? `<span class="text-ink-500">(${esc(d.bars.unit)})</span>` : ''}</span>
      <span class="inline-flex items-center gap-1.5"><span class="h-0.5 w-4" style="background:${lineColor}"></span><span class="font-medium">${esc(d.line.label)}</span>${d.line.unit ? `<span class="text-ink-500">(${esc(d.line.unit)})</span>` : ''}</span>
    </div>
  </div>`;
}

interface WfStep { label: string; delta: number; kind?: string }
function renderWaterfall(d: any, labels: { start: string; up: string; down: string; end: string; drift: string }): string {
  if (!d?.start || !d?.end) return '';
  const KIND_COLOR: Record<string, string> = {
    start: '#3A7DBE',
    positive: '#059669',
    negative: '#DC2626',
    end: '#16467D',
  };
  interface Bar { label: string; base: number; top: number; display: number; kind: 'start' | 'positive' | 'negative' | 'end' }
  const bars: Bar[] = [];
  bars.push({ label: d.start.label, base: 0, top: d.start.value, display: d.start.value, kind: 'start' });
  let running = d.start.value;
  for (const s of (d.steps ?? []) as WfStep[]) {
    if (s.delta >= 0) {
      bars.push({ label: s.label, base: running, top: running + s.delta, display: s.delta, kind: 'positive' });
    } else {
      bars.push({ label: s.label, base: running + s.delta, top: running, display: s.delta, kind: 'negative' });
    }
    running += s.delta;
  }
  bars.push({ label: d.end.label, base: 0, top: d.end.value, display: d.end.value, kind: 'end' });

  const sumDelta = ((d.steps ?? []) as WfStep[]).reduce((a, s) => a + s.delta, 0);
  const drift = Math.round((d.start.value + sumDelta - d.end.value) * 100) / 100;

  const W = 720, H = 340;
  const PADDING = { top: 24, right: 16, bottom: 64, left: 56 };
  const innerW = W - PADDING.left - PADDING.right;
  const innerH = H - PADDING.top - PADDING.bottom;
  const allVals = bars.flatMap((b) => [b.base, b.top]);
  const ticks = niceTicks(Math.min(0, ...allVals), Math.max(...allVals), 5);
  const yMin = ticks[0], yMax = ticks[ticks.length - 1];
  const yS = (v: number) => PADDING.top + innerH - ((v - yMin) / (yMax - yMin || 1)) * innerH;
  const step = innerW / bars.length;
  const barW = Math.min(52, step * 0.6);

  const connectors: string[] = [];
  for (let i = 0; i < bars.length - 1; i++) {
    const a = bars[i];
    const runTop = a.kind === 'negative' ? a.base : a.top;
    const x1 = PADDING.left + i * step + step / 2 + barW / 2;
    const x2 = PADDING.left + (i + 1) * step + step / 2 - barW / 2;
    connectors.push(`<line x1="${x1}" x2="${x2}" y1="${yS(runTop)}" y2="${yS(runTop)}" stroke="#94A3B8" stroke-dasharray="3 3"/>`);
  }

  const ticksSvg = ticks
    .map(
      (t) =>
        `<g><line x1="${PADDING.left}" x2="${W - PADDING.right}" y1="${yS(t)}" y2="${yS(t)}" stroke="${GRID}" stroke-dasharray="3 3"/><text x="${PADDING.left - 8}" y="${yS(t) + 4}" text-anchor="end" font-size="11" fill="${AXIS}">${fmt(t)}</text></g>`,
    )
    .join('');
  const barsSvg = bars
    .map((b, i) => {
      const x = PADDING.left + i * step + (step - barW) / 2;
      const y = yS(b.top);
      const h = Math.abs(yS(b.base) - yS(b.top));
      const labelY = y - 8;
      const sign = b.kind === 'negative' ? '−' : b.kind === 'positive' ? '+' : '';
      const dispText = `${sign}${fmt(Math.abs(b.display))}`;
      return `<g>
        <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="3" fill="${KIND_COLOR[b.kind]}"><title>${esc(b.label)}: ${dispText}${d.unit ? ' ' + esc(d.unit) : ''}</title></rect>
        <text x="${x + barW / 2}" y="${labelY}" text-anchor="middle" font-size="11" font-weight="600" fill="#0F172A">${dispText}</text>
        <text x="${x + barW / 2}" y="${H - PADDING.bottom + 18}" text-anchor="middle" font-size="10" fill="${AXIS}">${esc(b.label)}</text>
      </g>`;
    })
    .join('');

  return `<div class="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
    ${d.title ? `<div class="mb-3 text-sm font-semibold text-ink-900">${esc(d.title)}</div>` : ''}
    <div class="overflow-x-auto"><svg viewBox="0 0 ${W} ${H}" class="h-80 w-full min-w-[640px]" role="img">${ticksSvg}${connectors.join('')}${barsSvg}</svg></div>
    <div class="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-ink-600">
      <span class="inline-flex items-center gap-1.5"><span class="h-2 w-2 rounded-sm" style="background:${KIND_COLOR.start}"></span>${esc(labels.start)}</span>
      <span class="inline-flex items-center gap-1.5"><span class="h-2 w-2 rounded-sm" style="background:${KIND_COLOR.positive}"></span>${esc(labels.up)}</span>
      <span class="inline-flex items-center gap-1.5"><span class="h-2 w-2 rounded-sm" style="background:${KIND_COLOR.negative}"></span>${esc(labels.down)}</span>
      <span class="inline-flex items-center gap-1.5"><span class="h-2 w-2 rounded-sm" style="background:${KIND_COLOR.end}"></span>${esc(labels.end)}</span>
      ${Math.abs(drift) > 0.5 ? `<span class="ml-auto rounded-md bg-amber-50 px-2 py-0.5 font-medium text-amber-700">⚠ ${esc(labels.drift)}: ${drift > 0 ? '+' : ''}${drift} ${esc(d.unit ?? '')}</span>` : ''}
    </div>
  </div>`;
}

function renderDataTable(d: any): string {
  const cols = (d?.columns ?? []) as Array<{ key: string; label: string; align?: string }>;
  const rows = (d?.rows ?? []) as Array<Record<string, any>>;
  if (cols.length === 0 || rows.length === 0) return '';
  const thead = cols
    .map(
      (c) =>
        `<th class="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink-500 ${c.align === 'right' ? 'text-right' : 'text-left'}">${esc(c.label)}</th>`,
    )
    .join('');
  const tbody = rows
    .map(
      (row) =>
        `<tr class="border-b border-ink-100 last:border-b-0 hover:bg-ink-50/60 transition">${cols.map((c) => `<td class="px-3 py-2 text-ink-800 ${c.align === 'right' ? 'text-right tabular-nums' : ''}">${esc(row[c.key] ?? '—')}</td>`).join('')}</tr>`,
    )
    .join('');
  return `<div class="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
    ${d.title ? `<div class="mb-3 text-sm font-semibold text-ink-900">${esc(d.title)}</div>` : ''}
    <div class="overflow-x-auto"><table class="w-full border-collapse text-sm"><thead><tr class="border-b border-ink-200">${thead}</tr></thead><tbody>${tbody}</tbody></table></div>
  </div>`;
}

function renderVariance(d: any, labels: { item: string; variance: string; status: string }): string {
  const rows = (d?.rows ?? []) as Array<any>;
  if (rows.length === 0) return '';
  const baselineLabel = d.baseline_label ?? 'Plan';
  const STATUS_PILL: Record<string, string> = {
    green: 'bg-green-50 text-green-700 ring-green-200',
    amber: 'bg-amber-50 text-amber-700 ring-amber-200',
    red: 'bg-red-50 text-red-700 ring-red-200',
  };
  const maxAbsPct = Math.max(...rows.map((r) => Math.abs(r.delta_pct ?? 0)), 1);
  const fmtN = (n: number) => (Number.isInteger(n) ? n.toLocaleString('pl-PL') : n.toLocaleString('pl-PL', { maximumFractionDigits: 1 }));

  const trs = rows
    .map((r) => {
      const dAbs = r.delta_abs ?? r.actual - r.baseline;
      const dPct = r.delta_pct ?? (r.baseline !== 0 ? ((r.actual - r.baseline) / r.baseline) * 100 : 0);
      const positive = dPct >= 0;
      const widthPct = Math.min(100, (Math.abs(dPct) / maxAbsPct) * 100);
      const status = r.status ?? (positive ? 'green' : Math.abs(dPct) > 10 ? 'red' : 'amber');
      return `<tr class="border-b border-ink-100 last:border-b-0 hover:bg-ink-50/60 transition">
        <td class="px-3 py-2 text-ink-800">${esc(r.name)}</td>
        <td class="px-3 py-2 text-right tabular-nums text-ink-900">${fmtN(r.actual)}</td>
        <td class="px-3 py-2 text-right tabular-nums text-ink-600">${fmtN(r.baseline)}</td>
        <td class="px-3 py-2 text-right tabular-nums ${positive ? 'text-green-700' : 'text-red-700'}">${positive ? '+' : ''}${fmtN(dAbs)}</td>
        <td class="px-3 py-2 text-right tabular-nums font-semibold ${positive ? 'text-green-700' : 'text-red-700'}">${positive ? '+' : ''}${dPct.toFixed(1)}%</td>
        <td class="px-3 py-2"><div class="relative h-2 w-32 rounded-full bg-ink-100"><div class="absolute top-0 h-2 rounded-full ${positive ? 'left-1/2 bg-green-500' : 'right-1/2 bg-red-500'}" style="width:${widthPct / 2}%"></div><div class="absolute top-0 bottom-0 left-1/2 w-px bg-ink-300"></div></div></td>
        <td class="px-3 py-2 text-right"><span class="inline-block h-3 w-3 rounded-full ring-2 ${STATUS_PILL[status]}" title="${esc(status)}"></span></td>
      </tr>`;
    })
    .join('');

  return `<div class="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
    <div class="mb-3 flex flex-wrap items-end justify-between gap-3">
      ${d.title ? `<div class="text-sm font-semibold text-ink-900">${esc(d.title)}</div>` : ''}
      <div class="text-[10px] uppercase tracking-wider text-ink-500">${esc(d.metric_label ?? '')} · vs ${esc(baselineLabel)}</div>
    </div>
    <div class="overflow-x-auto"><table class="w-full border-collapse text-sm">
      <thead><tr class="border-b border-ink-200 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
        <th class="px-3 py-2 text-left">${esc(labels.item)}</th>
        <th class="px-3 py-2 text-right">Actual</th>
        <th class="px-3 py-2 text-right">${esc(baselineLabel)}</th>
        <th class="px-3 py-2 text-right">ΔAbs</th>
        <th class="px-3 py-2 text-right">Δ%</th>
        <th class="px-3 py-2 text-left">${esc(labels.variance)}</th>
        <th class="px-3 py-2 text-right">${esc(labels.status)}</th>
      </tr></thead>
      <tbody>${trs}</tbody>
    </table></div>
  </div>`;
}

function renderScenarioRange(d: any): string {
  const scenarios = (d?.scenarios ?? []) as Array<any>;
  if (scenarios.length === 0) return '';
  const ACCENT: Record<string, string> = {
    red: 'border-l-red-500',
    blue: 'border-l-blue-600',
    green: 'border-l-green-600',
  };
  const cells = scenarios
    .map(
      (s) =>
        `<div class="rounded-xl border border-ink-200 ${ACCENT[s.color ?? 'blue']} border-l-4 bg-ink-50/60 p-4">
          <div class="text-[10px] font-semibold uppercase tracking-wider text-ink-500">${esc(s.name)}</div>
          <div class="mt-1.5 flex items-baseline gap-1.5">
            <span class="text-2xl font-bold text-ink-900">${esc(s.value)}</span>
            ${d.unit ? `<span class="text-xs font-medium text-ink-500">${esc(d.unit)}</span>` : ''}
          </div>
          ${s.description ? `<div class="mt-2 text-xs text-ink-600">${esc(s.description)}</div>` : ''}
        </div>`,
    )
    .join('');
  return `<div class="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
    ${d.title ? `<div class="mb-3 text-sm font-semibold text-ink-900">${esc(d.title)}</div>` : ''}
    <div class="grid gap-3 sm:grid-cols-3">${cells}</div>
  </div>`;
}

function renderDrivers(d: any): string {
  const drivers = (d?.drivers ?? []) as Array<any>;
  if (drivers.length === 0) return '';
  const DIR: Record<string, string> = {
    up: 'bg-green-50 text-green-700',
    down: 'bg-red-50 text-red-700',
    neutral: 'bg-ink-100 text-ink-600',
  };
  const arrow = (dr?: string) => (dr === 'up' ? '↑' : dr === 'down' ? '↓' : '−');
  const cells = drivers
    .map(
      (dr) =>
        `<div class="rounded-xl border border-ink-200 bg-ink-50/40 p-3">
          <div class="flex items-center gap-2">
            <span class="grid h-7 w-7 place-items-center rounded-md text-sm font-bold ${DIR[dr.direction ?? 'neutral']}">${arrow(dr.direction)}</span>
            <span class="font-semibold text-ink-900">${esc(dr.name)}</span>
          </div>
          ${dr.impact ? `<div class="mt-2 text-sm font-medium tabular-nums text-ink-800">${esc(dr.impact)}</div>` : ''}
          ${dr.description ? `<div class="mt-1 text-xs text-ink-600">${esc(dr.description)}</div>` : ''}
        </div>`,
    )
    .join('');
  return `<div class="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
    ${d.title ? `<div class="mb-3 text-sm font-semibold text-ink-900">${esc(d.title)}</div>` : ''}
    <div class="grid gap-3 sm:grid-cols-2">${cells}</div>
  </div>`;
}

function renderRecommendation(
  d: any,
  labels: { actionItems: string; eyebrow: string; by: string; verdictYes: string; verdictNo: string; verdictConditional: string },
): string {
  if (!d) return '';
  const verdictKey = String(d.verdict ?? 'conditional').toLowerCase();
  const THEME: Record<string, any> = {
    tak:         { ring: 'ring-green-300', bg: 'bg-green-50', text: 'text-green-800', label: labels.verdictYes,         icon: '✓' },
    yes:         { ring: 'ring-green-300', bg: 'bg-green-50', text: 'text-green-800', label: labels.verdictYes,         icon: '✓' },
    nie:         { ring: 'ring-red-300',   bg: 'bg-red-50',   text: 'text-red-800',   label: labels.verdictNo,          icon: '✕' },
    no:          { ring: 'ring-red-300',   bg: 'bg-red-50',   text: 'text-red-800',   label: labels.verdictNo,          icon: '✕' },
    warunkowo:   { ring: 'ring-amber-300', bg: 'bg-amber-50', text: 'text-amber-800', label: labels.verdictConditional, icon: '?' },
    conditional: { ring: 'ring-amber-300', bg: 'bg-amber-50', text: 'text-amber-800', label: labels.verdictConditional, icon: '?' },
  };
  const theme = THEME[verdictKey] ?? THEME.conditional;
  const actions = (d.actions ?? []) as Array<any>;
  const actionsHtml = actions.length
    ? `<div class="mt-4">
        <div class="text-[10px] font-bold uppercase tracking-widest text-ink-500">${esc(labels.actionItems)}</div>
        <ol class="mt-2 space-y-2">${actions
          .map(
            (a, i) =>
              `<li class="flex items-start gap-3 rounded-lg border border-ink-200 bg-white/80 px-3 py-2 backdrop-blur">
                <span class="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-md bg-blue-100 text-[11px] font-bold text-blue-800">${i + 1}</span>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-ink-900">${esc(a.what)}</div>
                  <div class="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-ink-500">
                    ${a.owner ? `<span class="rounded-full bg-ink-100 px-2 py-0.5 font-semibold text-ink-700">${esc(a.owner)}</span>` : ''}
                    ${a.by ? `<span>${esc(labels.by)}: ${esc(a.by)}</span>` : ''}
                  </div>
                </div>
              </li>`,
          )
          .join('')}</ol>
      </div>`
    : '';

  return `<div class="relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 shadow-md ring-2 ${theme.ring}">
    <div aria-hidden="true" class="bg-hatch pointer-events-none absolute inset-0 opacity-40"></div>
    <div class="relative">
      <div class="flex items-center gap-3">
        <span class="grid h-12 w-12 place-items-center rounded-xl text-2xl font-bold ${theme.bg} ${theme.text}">${theme.icon}</span>
        <div>
          <div class="text-[10px] font-bold uppercase tracking-widest ${theme.text}">${esc(labels.eyebrow)} · ${theme.label}</div>
          ${d.title ? `<div class="mt-0.5 text-lg font-bold text-ink-900">${esc(d.title)}</div>` : ''}
        </div>
      </div>
      ${d.rationale ? `<div class="mt-4 rounded-xl border border-ink-200 bg-white/80 p-3 text-sm leading-relaxed text-ink-700 backdrop-blur">${esc(d.rationale)}</div>` : ''}
      ${actionsHtml}
    </div>
  </div>`;
}

function renderCallout(d: any, tone: 'insight' | 'info' | 'warning', labels: { insight: string; info: string; warning: string }): string {
  const text = (d?.text ?? '').trim();
  if (!text) return '';
  const VARIANTS = {
    insight: { bg: 'bg-blue-50/70', border: 'border-blue-200', iconBg: 'bg-blue-100', iconText: 'text-blue-700', label: labels.insight, icon: '✦' },
    info: { bg: 'bg-ink-50', border: 'border-ink-200', iconBg: 'bg-ink-100', iconText: 'text-ink-700', label: labels.info, icon: 'ⓘ' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-100', iconText: 'text-amber-700', label: labels.warning, icon: '⚠' },
  };
  const v = VARIANTS[tone];
  return `<div class="flex gap-3 rounded-2xl border ${v.border} ${v.bg} px-4 py-3 shadow-sm">
    <div class="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-lg ${v.iconBg} ${v.iconText}">${v.icon}</div>
    <div class="flex-1 min-w-0">
      <div class="text-[10px] font-bold uppercase tracking-widest text-ink-500">${esc(v.label)}</div>
      <div class="mt-1 text-sm leading-relaxed text-ink-800">${inlineMd(text)}</div>
    </div>
  </div>`;
}

/* ---------- public API ---------- */

export interface RenderLabels {
  reportHeaderEyebrow: string; // "Raport zarządczy" / "Management report"
  waterfallStart: string;
  waterfallUp: string;
  waterfallDown: string;
  waterfallEnd: string;
  waterfallDrift: string;
  varianceItem: string;
  varianceVariance: string;
  varianceStatus: string;
  recommendationActions: string;     // "Action items"
  recommendationEyebrow: string;     // "Recommendation" / "Rekomendacja"
  recommendationBy: string;          // "by" / "do"
  recommendationVerdictYes: string;  // "YES" / "TAK"
  recommendationVerdictNo: string;   // "NO" / "NIE"
  recommendationVerdictConditional: string; // "CONDITIONAL" / "WARUNKOWO"
  calloutInsight: string;
  calloutInfo: string;
  calloutWarning: string;
}

export function renderBlock(block: Block, labels: RenderLabels): string {
  switch (block.type) {
    case 'markdown': return renderMarkdown(block.content);
    case 'report-header': return renderReportHeader(block.data, labels.reportHeaderEyebrow);
    case 'metric-cards': return renderMetricCards(block.data);
    case 'kpi-card': return renderKpiCard(block.data);
    case 'chart:donut': return renderDonut(block.data);
    case 'chart:bar': return renderBar(block.data);
    case 'chart:line': return renderLine(block.data);
    case 'chart:combo': return renderCombo(block.data);
    case 'chart:waterfall':
      return renderWaterfall(block.data, {
        start: labels.waterfallStart, up: labels.waterfallUp,
        down: labels.waterfallDown, end: labels.waterfallEnd,
        drift: labels.waterfallDrift,
      });
    case 'data-table': return renderDataTable(block.data);
    case 'variance-table':
      return renderVariance(block.data, {
        item: labels.varianceItem, variance: labels.varianceVariance, status: labels.varianceStatus,
      });
    case 'scenario-range': return renderScenarioRange(block.data);
    case 'driver-cards': return renderDrivers(block.data);
    case 'recommendation': return renderRecommendation(block.data, {
      actionItems: labels.recommendationActions,
      eyebrow: labels.recommendationEyebrow,
      by: labels.recommendationBy,
      verdictYes: labels.recommendationVerdictYes,
      verdictNo: labels.recommendationVerdictNo,
      verdictConditional: labels.recommendationVerdictConditional,
    });
    case 'callout:insight':
      return renderCallout(block.data, 'insight', { insight: labels.calloutInsight, info: labels.calloutInfo, warning: labels.calloutWarning });
    case 'callout:info':
      return renderCallout(block.data, 'info', { insight: labels.calloutInsight, info: labels.calloutInfo, warning: labels.calloutWarning });
    case 'callout:warning':
      return renderCallout(block.data, 'warning', { insight: labels.calloutInsight, info: labels.calloutInfo, warning: labels.calloutWarning });
    default:
      return '';
  }
}

/** Render full viewer body (sections + grouped kpi-rows) from parsed blocks. */
export function renderViewerBody(
  blocks: Block[],
  sections: Section[],
  labels: RenderLabels,
): { body: string; sections: Section[] } {
  const bySection = new Map<number, Block[]>();
  for (const b of blocks) {
    if (!bySection.has(b.section)) bySection.set(b.section, []);
    bySection.get(b.section)!.push(b);
  }
  const preSection = bySection.get(-1) ?? [];

  const renderGroups = (blockList: Block[]) =>
    groupKpiCards(blockList)
      .map((g) => {
        if (g.kind === 'block') return renderBlock(g.block, labels);
        return `<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">${g.blocks.map((b) => renderBlock(b, labels)).join('')}</div>`;
      })
      .join('');

  const pre = preSection.length ? renderGroups(preSection) : '';

  const sectionsHtml = sections
    .map((sec) => {
      const bl = bySection.get(sec.index) ?? [];
      return `<section data-section-anchor="${sec.index}" class="scroll-mt-44 space-y-5">
        <h2 class="flex items-center gap-3 pt-2 text-2xl font-bold tracking-tight text-ink-900">
          <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-green-600 text-sm font-bold text-white shadow">${esc(sec.label)}</span>
          ${esc(sec.title)}
        </h2>
        ${renderGroups(bl)}
      </section>`;
    })
    .join('');

  return { body: pre + sectionsHtml, sections };
}

/** Render the sidebar section nav (replaces the static one after live re-render). */
export function renderSectionNav(sections: Section[], labels: { sections: string; allSections: string }): string {
  const tabs = sections
    .map(
      (s) =>
        `<button type="button" class="poc-tab flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-ink-600 transition hover:bg-ink-50 hover:text-ink-900" data-section="${s.index}">
          <span class="grid h-5 w-5 flex-shrink-0 place-items-center rounded-md bg-blue-700 text-[10px] font-bold text-white">${esc(s.label)}</span>
          <span class="truncate">${esc(s.title)}</span>
        </button>`,
    )
    .join('');

  return `<div class="px-1 pt-1 text-[10px] font-bold uppercase tracking-widest text-ink-500">${esc(labels.sections)}</div>
    <div class="mt-2 flex flex-col gap-0.5">
      <button type="button" class="poc-tab flex items-center gap-2 rounded-lg bg-blue-50 px-2 py-1.5 text-left text-xs font-semibold text-blue-800 transition" data-section="all" aria-current="true">
        <span class="grid h-5 w-5 flex-shrink-0 place-items-center rounded-md bg-blue-700 text-[10px] font-bold text-white">★</span>
        ${esc(labels.allSections)}
      </button>
      ${tabs}
    </div>`;
}
