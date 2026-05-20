/**
 * Parser dla custom rich-markup formatu Metyry.
 * Runs server-side w Astro — produkuje strukturyzowany model który komponenty .astro renderują.
 *
 * Rozpoznaje:
 *   - H1 nagłówki (`# 1. Overview`) → nowa sekcja
 *   - Fenced blocks `:::TYPE\n<json>\n:::` → typowane bloki
 *   - Wszystko inne → markdown buffer między blokami
 *
 * Tolerancyjny — nieparsowane bloki callout fallback'ują do `{text}`, niezamknięte bloki są pomijane.
 */

export type BlockType =
  | 'markdown'
  | 'report-header'
  | 'metric-cards'
  | 'kpi-card'
  | 'chart:donut'
  | 'chart:bar'
  | 'chart:line'
  | 'chart:combo'
  | 'chart:waterfall'
  | 'data-table'
  | 'variance-table'
  | 'scenario-range'
  | 'driver-cards'
  | 'recommendation'
  | 'callout:insight'
  | 'callout:info'
  | 'callout:warning';

export interface Section {
  index: number;
  label: string;
  title: string;
  slug: string;
}

export interface Block {
  type: BlockType;
  content: string;
  data: any | null;
  section: number;
}

export interface ParsedDoc {
  blocks: Block[];
  sections: Section[];
}

const BLOCK_TYPES = new Set<string>([
  'markdown',
  'report-header',
  'metric-cards',
  'kpi-card',
  'chart:donut',
  'chart:bar',
  'chart:line',
  'chart:combo',
  'chart:waterfall',
  'data-table',
  'variance-table',
  'scenario-range',
  'driver-cards',
  'recommendation',
  'callout:insight',
  'callout:info',
  'callout:warning',
]);

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) =>
      ({ ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' })[c] ?? c,
    )
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseH1(line: string): { label: string; title: string } | null {
  const m = /^#\s+(.+?)\s*$/.exec(line);
  if (!m) return null;
  const text = m[1].trim();
  // ONLY treat numbered H1 (e.g. "# 1. Overview") as a section header.
  // Free-form H1 lines coming from buggy model output (e.g. "# Trend: ...") are
  // ignored as cruft so the user never sees stray `#` markers in the UI.
  const numbered = /^([0-9]+)\.\s*(.+)$/.exec(text);
  if (numbered) return { label: numbered[1], title: numbered[2].trim() };
  return null;
}

/** Lines that should NEVER make it into the markdown buffer — pure cruft.
 *
 * Critical for streaming UX: when a chunk arrives mid-block (e.g. ` :::chart `
 * before ` :donut\n{...}\n::: ` lands), the partial `:::xxx` line would
 * otherwise be emitted as markdown text. By filtering it we guarantee the
 * user only ever sees fully-parsed blocks. */
function isCruftLine(line: string): boolean {
  const t = line.trim();
  if (!t) return false; // keep blank lines
  // ANY line starting with `:::` — bare close, partial opener, unknown type
  if (t.startsWith(':::')) return true;
  if (t === '```' || /^```\w*$/.test(t)) return true;
  if (t === '---' || t === '___' || t === '***') return true;
  if (t === '#' || /^#+\s*$/.test(t)) return true;
  // H1 lines: only `# <num>. <title>` with non-empty title counts as a section.
  // Anything else starting with `# ` (incl `# 1.` mid-stream before title arrives)
  // is treated as cruft to avoid flashing partial headers.
  if (/^#\s+/.test(t)) {
    if (!/^#\s+\d+\.\s+\S/.test(t)) return true;
  }
  return false;
}

function tryParseJson(raw: string): any | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    return null;
  }
}

/* ============================================================
 * normalizeMarkup — recovery layer for malformed LLM output
 *
 * Weaker models (e.g. nano) sometimes emit blocks as:
 *   ```json
 *   { "kpi": [...] }
 *   :::
 *
 * instead of the strict ` :::kpi-card\n{...}\n::: `. This normalizer:
 *   1. Detects ` ```json ... ::: ` or ` ```json ... ``` ` triplets
 *   2. Parses the inner JSON
 *   3. Infers the block type from JSON shape (heuristics)
 *   4. Unwraps nested type-named wrappers (e.g. {"donut": {...}} → {...})
 *   5. Splits collection wrappers (e.g. {"kpi": [a,b,c]} → 3× :::kpi-card)
 *   6. Rewrites the buffer so downstream parsing renders correctly
 *
 * Idempotent — running multiple times yields the same result.
 * ============================================================ */

function inferBlockFromJson(obj: any): string {
  if (!obj || typeof obj !== 'object') return '';

  // Wrapper objects with a single named key like {"donut": {...}}
  const keys = Object.keys(obj);
  if (keys.length === 1) {
    const k = keys[0];
    const inner = obj[k];
    const wrapperMap: Record<string, string> = {
      donut: ':::chart:donut',
      bar: ':::chart:bar',
      line: ':::chart:line',
      combo: ':::chart:combo',
      waterfall: ':::chart:waterfall',
      scenario: ':::scenario-range',
      scenarios: ':::scenario-range',
      drivers: ':::driver-cards',
      variance: ':::variance-table',
      recommendation: ':::recommendation',
      header: ':::report-header',
      'report-header': ':::report-header',
    };
    if (wrapperMap[k] && inner && typeof inner === 'object') {
      return `${wrapperMap[k]}\n${JSON.stringify(inner)}\n:::`;
    }
    // {"cards": [...]} → metric-cards
    if (k === 'cards' && Array.isArray(inner)) {
      return `:::metric-cards\n${JSON.stringify({ cards: inner })}\n:::`;
    }
    // {"kpi": [...]} or {"kpis": [...]} → multiple kpi-card blocks
    if ((k === 'kpi' || k === 'kpis') && Array.isArray(inner)) {
      return inner.map((card) => `:::kpi-card\n${JSON.stringify(card)}\n:::`).join('\n\n');
    }
    // {"peer": [...]} → data-table
    if ((k === 'peer' || k === 'peers') && Array.isArray(inner) && inner.length > 0) {
      const sample = inner[0];
      const columns = Object.keys(sample).map((key) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        align: typeof sample[key] === 'number' ? 'right' : 'left',
      }));
      return `:::data-table\n${JSON.stringify({ title: 'Peer group', columns, rows: inner })}\n:::`;
    }
    // {"insights": [...]} possibly with siblings → emit each as callout, plus methodology/risk/recommendation
    if (k === 'insights' && Array.isArray(inner)) {
      return inner.map((i) => `:::callout:insight\n${JSON.stringify(i)}\n:::`).join('\n\n');
    }
    // {"comment": "..."} → markdown paragraph
    if (k === 'comment' && typeof inner === 'string') return inner;
  }

  // Multi-key shape: combo of insights + methodology + risk + recommendation
  if (Array.isArray(obj.insights)) {
    const parts: string[] = obj.insights.map(
      (i: any) => `:::callout:insight\n${JSON.stringify(i)}\n:::`,
    );
    if (obj.methodology) parts.push(`:::callout:info\n${JSON.stringify({ text: obj.methodology })}\n:::`);
    if (obj.risk) parts.push(`:::callout:warning\n${JSON.stringify({ text: obj.risk })}\n:::`);
    if (obj.recommendation) parts.push(`:::recommendation\n${JSON.stringify(obj.recommendation)}\n:::`);
    return parts.join('\n\n');
  }

  // Top-level recognisable shapes
  if (obj.title && Array.isArray(obj.stats)) return `:::report-header\n${JSON.stringify(obj)}\n:::`;
  if (Array.isArray(obj.cards)) return `:::metric-cards\n${JSON.stringify(obj)}\n:::`;
  if (obj.verdict && Array.isArray(obj.actions)) return `:::recommendation\n${JSON.stringify(obj)}\n:::`;
  if (obj.start && obj.end && Array.isArray(obj.steps)) return `:::chart:waterfall\n${JSON.stringify(obj)}\n:::`;
  if (Array.isArray(obj.scenarios)) return `:::scenario-range\n${JSON.stringify(obj)}\n:::`;
  if (obj.drivers && Array.isArray(obj.drivers)) return `:::driver-cards\n${JSON.stringify(obj)}\n:::`;
  if (Array.isArray(obj.rows) && obj.metric_label) return `:::variance-table\n${JSON.stringify(obj)}\n:::`;
  if (Array.isArray(obj.columns) && Array.isArray(obj.rows)) return `:::data-table\n${JSON.stringify(obj)}\n:::`;
  if (obj.bars && obj.line && Array.isArray(obj.data)) return `:::chart:combo\n${JSON.stringify(obj)}\n:::`;
  if (Array.isArray(obj.series) && Array.isArray(obj.data)) {
    // line vs bar — line typically has period field; bar has category
    const sample = obj.data[0] || {};
    if ('period' in sample) return `:::chart:line\n${JSON.stringify(obj)}\n:::`;
    if ('category' in sample) return `:::chart:bar\n${JSON.stringify(obj)}\n:::`;
    return `:::chart:line\n${JSON.stringify(obj)}\n:::`;
  }
  if (Array.isArray(obj.data) && obj.data.length > 0 && 'name' in obj.data[0] && 'value' in obj.data[0]) {
    return `:::chart:donut\n${JSON.stringify(obj)}\n:::`;
  }
  if (obj.label && (obj.spark || obj.delta || obj.status)) {
    return `:::kpi-card\n${JSON.stringify(obj)}\n:::`;
  }
  if (typeof obj.text === 'string') {
    return `:::callout:insight\n${JSON.stringify(obj)}\n:::`;
  }

  return '';
}

/**
 * Detect a markdown table block in the text and convert it to :::data-table.
 * Expects format:
 *   | col1 | col2 | col3 |
 *   |---|---|---|
 *   | val | val | val |
 *   ...
 * Trailing empty rows / partial rows are dropped.
 */
function convertMarkdownTables(text: string): string {
  const lines = text.split('\n');
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // Detect potential table header (line starting with `|` followed by separator row of `|---|...|`)
    if (/^\s*\|.+\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|\s*:?-{2,}/.test(lines[i + 1])) {
      // Collect header + separator + rows until non-table line
      const header = line;
      const sep = lines[i + 1];
      const rows: string[] = [];
      let j = i + 2;
      while (j < lines.length && /^\s*\|.+\|\s*$/.test(lines[j])) {
        rows.push(lines[j]);
        j++;
      }
      // Build data-table block
      const splitCells = (l: string) =>
        l
          .trim()
          .replace(/^\|/, '')
          .replace(/\|\s*$/, '')
          .split('|')
          .map((c) => c.trim());
      const headers = splitCells(header);
      const seps = splitCells(sep);
      const aligns = seps.map((s) => (s.endsWith(':') ? 'right' : 'left'));
      const columns = headers.map((h, idx) => {
        const key = h.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || `c${idx}`;
        return { key, label: h, align: aligns[idx] ?? 'left' };
      });
      // Skip if total row "Razem" or rows have padding emptiness
      const rowObjs = rows
        .map((r) => splitCells(r))
        .filter((cells) => cells.some((c) => c.length > 0))
        .map((cells) => {
          const obj: Record<string, string> = {};
          cells.forEach((c, idx) => {
            if (columns[idx]) obj[columns[idx].key] = c;
          });
          return obj;
        });
      if (rowObjs.length >= 2 && columns.length >= 2) {
        const payload = { title: '', columns, rows: rowObjs };
        out.push(`:::data-table\n${JSON.stringify(payload)}\n:::`);
        i = j;
        continue;
      }
    }
    out.push(line);
    i++;
  }
  return out.join('\n');
}

/**
 * Merge adjacent :::metric-cards blocks into one block (preserving order).
 * Formatter sometimes emits each card as its own block; UI wants them grouped.
 */
function mergeAdjacentMetricCards(text: string): string {
  const blockRe = /:::metric-cards\s*\n([\s\S]*?)\n:::/g;
  let lastEnd = -1;
  let mergedCards: any[] = [];
  let mergeStart = -1;
  const replacements: Array<{ start: number; end: number; text: string }> = [];

  let m: RegExpExecArray | null;
  // First collect all metric-cards block positions + payloads
  const matches: Array<{ start: number; end: number; cards: any[] }> = [];
  while ((m = blockRe.exec(text)) !== null) {
    let cards: any[] = [];
    try {
      const parsed = JSON.parse(m[1]);
      cards = parsed?.cards ?? [];
    } catch {}
    matches.push({ start: m.index, end: m.index + m[0].length, cards });
  }
  if (matches.length === 0) return text;

  // Group adjacent (only whitespace between)
  const groups: Array<{ start: number; end: number; cards: any[] }> = [];
  let cur = { ...matches[0] };
  for (let k = 1; k < matches.length; k++) {
    const between = text.slice(cur.end, matches[k].start);
    if (/^\s*$/.test(between)) {
      cur.end = matches[k].end;
      cur.cards = cur.cards.concat(matches[k].cards);
    } else {
      groups.push(cur);
      cur = { ...matches[k] };
    }
  }
  groups.push(cur);

  // Rebuild output: replace each group span with merged block
  let out = '';
  let pos = 0;
  for (const g of groups) {
    out += text.slice(pos, g.start);
    out += `:::metric-cards\n${JSON.stringify({ cards: g.cards })}\n:::`;
    pos = g.end;
  }
  out += text.slice(pos);
  return out;
}

export function normalizeMarkup(text: string): string {
  // Two passes — :::-closer first (most common), then ```-closer.
  // Two separate passes avoid the alternation pitfall where ```json...```json
  // gets matched as one mega-block (alt-1 swallows two openers).
  const passes: RegExp[] = [
    /```(?:json|JSON)?\s*\n([\s\S]*?)\n:::/g,
    /```(?:json|JSON)?\s*\n([\s\S]*?)\n```/g,
  ];
  let out = text;
  for (const re of passes) {
    out = out.replace(re, (_full, body) => {
      const trimmed = (body ?? '').trim();
      if (!trimmed) return '';
      try {
        const parsed = JSON.parse(trimmed);
        const inferred = inferBlockFromJson(parsed);
        if (inferred) return inferred;
      } catch {
        // not valid JSON — drop the broken block
      }
      return '';
    });
  }
  // Convert leftover raw markdown tables into data-table blocks
  out = convertMarkdownTables(out);
  // Merge consecutive metric-cards (P25/P50/P75 should be one block, not three)
  out = mergeAdjacentMetricCards(out);
  return out;
}

export function parseRichMarkdown(input: string): ParsedDoc {
  // Recovery layer first — turn malformed code-fence wrappers into proper blocks.
  input = normalizeMarkup(input);

  const lines = input.split('\n');
  const blocks: Block[] = [];
  const sections: Section[] = [];

  let mdBuffer: string[] = [];
  let sectionIdx = -1;
  let inBlock = false;
  let currentType: BlockType | null = null;
  let blockBuffer: string[] = [];

  const flushMarkdown = () => {
    if (mdBuffer.length === 0) return;
    const text = mdBuffer.join('\n').replace(/\s+$/g, '');
    if (text.trim().length > 0) {
      blocks.push({ type: 'markdown', content: text, data: null, section: sectionIdx });
    }
    mdBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!inBlock) {
      const h1 = parseH1(line);
      if (h1) {
        flushMarkdown();
        const idx = sections.length;
        sections.push({
          index: idx,
          label: h1.label,
          title: h1.title,
          slug: slugify(h1.title),
        });
        sectionIdx = idx;
        continue;
      }

      if (trimmed.startsWith(':::') && trimmed.length > 3) {
        const candidate = trimmed.slice(3).trim();
        if (BLOCK_TYPES.has(candidate)) {
          flushMarkdown();
          inBlock = true;
          currentType = candidate as BlockType;
          blockBuffer = [];
          continue;
        }
      }

      // Filter out cruft lines (bare `:::`, ``` fences, unnumbered H1, etc.)
      if (!isCruftLine(line)) mdBuffer.push(line);
    } else {
      if (trimmed === ':::') {
        const raw = blockBuffer.join('\n');
        const type = currentType!;
        const isCallout = type.startsWith('callout:');
        let data: any | null = tryParseJson(raw);
        if (data === null && isCallout) {
          const stripped = raw.trim();
          if (stripped) data = { text: stripped };
        }
        blocks.push({ type, content: raw, data, section: sectionIdx });
        inBlock = false;
        currentType = null;
        blockBuffer = [];
        continue;
      }
      blockBuffer.push(line);
    }
  }

  if (!inBlock) flushMarkdown();

  return { blocks, sections };
}

/** Groups consecutive kpi-card blocks so they render side-by-side. */
export type Group =
  | { kind: 'block'; block: Block }
  | { kind: 'kpi-row'; blocks: Block[] };

export function groupKpiCards(blocks: Block[]): Group[] {
  const out: Group[] = [];
  let buf: Block[] = [];
  const flush = () => {
    if (buf.length === 0) return;
    if (buf.length === 1) out.push({ kind: 'block', block: buf[0] });
    else out.push({ kind: 'kpi-row', blocks: [...buf] });
    buf = [];
  };
  for (const b of blocks) {
    if (b.type === 'kpi-card') buf.push(b);
    else {
      flush();
      out.push({ kind: 'block', block: b });
    }
  }
  flush();
  return out;
}

/** Very small markdown inline converter — bold + italic + code. Server-side, no deps. */
export function renderInlineMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

/** Block-level markdown → HTML for markdown blocks. Supports paragraphs, lists, bold/italic. */
export function renderBlockMarkdown(text: string): string {
  const paragraphs = text.split(/\n\s*\n/);
  return paragraphs
    .map((para) => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      // unordered list?
      if (/^[-*]\s+/.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .filter((l) => /^[-*]\s+/.test(l.trim()))
          .map((l) => `<li>${renderInlineMarkdown(l.trim().replace(/^[-*]\s+/, ''))}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      // ordered list?
      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .filter((l) => /^\d+\.\s+/.test(l.trim()))
          .map((l) => `<li>${renderInlineMarkdown(l.trim().replace(/^\d+\.\s+/, ''))}</li>`)
          .join('');
        return `<ol>${items}</ol>`;
      }
      // paragraph
      return `<p>${renderInlineMarkdown(trimmed.replace(/\n/g, ' '))}</p>`;
    })
    .filter(Boolean)
    .join('');
}
