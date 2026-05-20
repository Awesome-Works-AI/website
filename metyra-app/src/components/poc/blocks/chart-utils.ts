/** Helpers shared by Astro SVG chart components. */

export const PALETTE = [
  '#16467D', // blue-700
  '#059669', // green-600
  '#EA580C', // orange-600
  '#3A7DBE', // blue-400
  '#10B981', // green-500
  '#FB923C', // orange-400
  '#B45309', // amber-700
] as const;

export const AXIS_COLOR = '#64748B'; // ink-500
export const GRID_COLOR = '#E2E8F0'; // ink-200

export function niceTicks(min: number, max: number, count = 5): number[] {
  if (min === max) return [min];
  const range = max - min;
  const rough = range / (count - 1);
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / pow;
  const step = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
  const tick = step * pow;
  const start = Math.floor(min / tick) * tick;
  const end = Math.ceil(max / tick) * tick;
  const ticks: number[] = [];
  for (let v = start; v <= end + 1e-9; v += tick) ticks.push(+v.toFixed(6));
  return ticks;
}

export function fmt(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString('pl-PL');
  if (Number.isInteger(n)) return String(n);
  return n.toLocaleString('pl-PL', { maximumFractionDigits: 1 });
}

/** Arc path generator (used by donut chart). Returns SVG path d="..." string. */
export function arcPath(
  cx: number,
  cy: number,
  r0: number,
  r1: number,
  startAngle: number,
  endAngle: number,
): string {
  const a0 = (startAngle * Math.PI) / 180;
  const a1 = (endAngle * Math.PI) / 180;
  const x0 = cx + r1 * Math.cos(a0);
  const y0 = cy + r1 * Math.sin(a0);
  const x1 = cx + r1 * Math.cos(a1);
  const y1 = cy + r1 * Math.sin(a1);
  const xi0 = cx + r0 * Math.cos(a1);
  const yi0 = cy + r0 * Math.sin(a1);
  const xi1 = cx + r0 * Math.cos(a0);
  const yi1 = cy + r0 * Math.sin(a0);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${x0} ${y0}`,
    `A ${r1} ${r1} 0 ${large} 1 ${x1} ${y1}`,
    `L ${xi0} ${yi0}`,
    `A ${r0} ${r0} 0 ${large} 0 ${xi1} ${yi1}`,
    'Z',
  ].join(' ');
}
