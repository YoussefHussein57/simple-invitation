// A full, layered botanical corner spray: three overlapping stems,
// a run of leaves at varying sizes, two statement rose blooms (real
// layered petals + a spiral center, not just a dot-flower), a few
// small filler blossoms, and buds — matching a proper printed
// invitation's corner illustration rather than a single sprig.
// Used on the invitation card, the envelope/letter, and as a closing
// accent elsewhere in the site. Pass `flip` to mirror it 180° for the
// opposite corner, rather than maintaining separate mirrored artwork.

const STEMS = [
  { d: "M6,6 C 30,18 40,8 58,26 C 74,42 78,30 100,50", width: 1.6 },
  { d: "M6,6 C 24,32 20,48 38,64 C 52,78 48,90 62,108", width: 1.5 },
  { d: "M6,6 C 40,10 55,22 82,20 C 104,18 112,32 138,34", width: 1.3 },
];

const LEAVES = [
  { x: 20, y: 12, angle: -35, w: 4, h: 15, tone: 0, opacity: 0.85 },
  { x: 32, y: 16, angle: 20, w: 3.6, h: 13, tone: 1, opacity: 0.9 },
  { x: 46, y: 22, angle: -15, w: 3.8, h: 14, tone: 0, opacity: 0.85 },
  { x: 63, y: 32, angle: 40, w: 3.4, h: 12, tone: 1, opacity: 0.88 },
  { x: 80, y: 42, angle: -25, w: 3.2, h: 11, tone: 0, opacity: 0.85 },
  { x: 92, y: 48, angle: 15, w: 2.8, h: 10, tone: 1, opacity: 0.85 },

  { x: 16, y: 24, angle: -60, w: 3.6, h: 13, tone: 1, opacity: 0.85 },
  { x: 24, y: 40, angle: -80, w: 3.4, h: 12, tone: 0, opacity: 0.85 },
  { x: 34, y: 55, angle: -55, w: 3.2, h: 11, tone: 1, opacity: 0.85 },
  { x: 46, y: 70, angle: -75, w: 3, h: 10.5, tone: 0, opacity: 0.85 },
  { x: 56, y: 88, angle: -60, w: 2.8, h: 10, tone: 1, opacity: 0.8 },

  { x: 30, y: 8, angle: 60, w: 3.4, h: 12, tone: 0, opacity: 0.85 },
  { x: 50, y: 12, angle: 30, w: 3.2, h: 11, tone: 1, opacity: 0.85 },
  { x: 70, y: 16, angle: 55, w: 3, h: 10.5, tone: 0, opacity: 0.85 },
  { x: 92, y: 20, angle: 25, w: 2.8, h: 10, tone: 1, opacity: 0.85 },
  { x: 112, y: 26, angle: 50, w: 2.6, h: 9.5, tone: 0, opacity: 0.8 },
  { x: 128, y: 32, angle: 20, w: 2.4, h: 9, tone: 1, opacity: 0.8 },
];

const ROSES = [
  { x: 30, y: 22, scale: 1, rotation: -10 },
  { x: 70, y: 44, scale: 0.82, rotation: 25 },
];

const BLOOMS = [
  { x: 96, y: 50, scale: 0.95 },
  { x: 50, y: 84, scale: 0.85 },
  { x: 118, y: 30, scale: 0.75 },
];

const BUDS = [
  { x: 108, y: 56, scale: 0.9 },
  { x: 62, y: 100, scale: 0.8 },
  { x: 134, y: 36, scale: 0.7 },
];

function Leaf({ x, y, angle, w, h, tone, opacity }) {
  const fill = tone === 0 ? "var(--color-sage)" : "var(--color-sage-dim)";
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      <path
        d={`M0,0 Q ${h * 0.55},${-w} ${h},0 Q ${h * 0.55},${w} 0,0 Z`}
        fill={fill}
        opacity={opacity}
      />
    </g>
  );
}

function Rose({ x, y, scale, rotation }) {
  const w = 6 * scale;
  const h = 15 * scale;
  const petalCount = 6;
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = rotation + (360 / petalCount) * i;
    const layerScale = i % 2 === 0 ? 1 : 0.8;
    return (
      <g key={i} transform={`rotate(${angle}) scale(${layerScale})`}>
        <path
          d={`M0,0 Q ${-w},${h * 0.42} 0,${h} Q ${w},${h * 0.42} 0,0 Z`}
          fill="var(--color-paper)"
          stroke="var(--color-gold)"
          strokeWidth={0.55 / scale}
          opacity={0.96}
        />
      </g>
    );
  });

  const steps = 14;
  const spiralPts = Array.from({ length: steps + 1 }, (_, i) => {
    const t = (i / steps) * Math.PI * 2 * 1.4;
    const r = 0.6 * scale + 0.55 * scale * t;
    return `${(r * Math.cos(t)).toFixed(2)},${(r * Math.sin(t)).toFixed(2)}`;
  });

  return (
    <g transform={`translate(${x},${y})`}>
      {petals}
      <path
        d={`M ${spiralPts.join(" L ")}`}
        fill="none"
        stroke="var(--color-gold-bright)"
        strokeWidth={0.7 / scale}
        strokeLinecap="round"
      />
    </g>
  );
}

function SmallBloom({ x, y, scale = 1 }) {
  const r = 2.4 * scale;
  const petals = Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return [Math.cos(a) * r * 1.4, Math.sin(a) * r * 1.4];
  });
  return (
    <g transform={`translate(${x},${y})`}>
      {petals.map(([px, py], i) => (
        <circle
          key={i}
          cx={px}
          cy={py}
          r={r}
          fill="var(--color-paper)"
          stroke="var(--color-gold)"
          strokeWidth={0.55 * scale}
        />
      ))}
      <circle cx={0} cy={0} r={r * 0.5} fill="var(--color-gold-bright)" />
    </g>
  );
}

function Bud({ x, y, scale = 1 }) {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={2.1 * scale}
        fill="var(--color-paper)"
        stroke="var(--color-gold)"
        strokeWidth={0.5}
      />
      <circle cx={x} cy={y} r={0.9 * scale} fill="var(--color-gold-bright)" />
    </>
  );
}

export function BotanicalCorner({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      {STEMS.map((s) => (
        <path
          key={s.d}
          d={s.d}
          stroke="var(--color-sage)"
          strokeWidth={s.width}
          fill="none"
          strokeLinecap="round"
          opacity={0.9}
        />
      ))}
      {LEAVES.map((l, i) => (
        <Leaf key={i} {...l} />
      ))}
      {ROSES.map((r, i) => (
        <Rose key={i} {...r} />
      ))}
      {BLOOMS.map((b, i) => (
        <SmallBloom key={i} {...b} />
      ))}
      {BUDS.map((b, i) => (
        <Bud key={i} {...b} />
      ))}
    </svg>
  );
}

/** A fuller flanking spray — two stems, a run of leaves, two small
 * blooms and a bud — for headings/dividers where a single thin twig
 * would read as too sparse, but the dense full corner would crowd
 * a one-line accent. */
export function BotanicalSprig({ className = "" }) {
  return (
    <svg viewBox="0 0 140 70" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4,60 C 22,52 28,40 42,34 C 56,28 60,18 78,10"
        stroke="var(--color-sage)"
        strokeWidth={1.4}
        fill="none"
        strokeLinecap="round"
        opacity={0.9}
      />
      <path
        d="M4,60 C 18,58 22,50 34,48 C 46,46 48,38 62,36"
        stroke="var(--color-sage-dim)"
        strokeWidth={1.1}
        fill="none"
        strokeLinecap="round"
        opacity={0.8}
      />

      <Leaf x={14} y={54} angle={-70} w={3.2} h={12} tone={0} opacity={0.85} />
      <Leaf x={22} y={44} angle={-55} w={3} h={11} tone={1} opacity={0.85} />
      <Leaf x={34} y={38} angle={-45} w={2.8} h={10.5} tone={0} opacity={0.85} />
      <Leaf x={48} y={30} angle={-35} w={2.8} h={10} tone={1} opacity={0.85} />
      <Leaf x={62} y={22} angle={-50} w={2.6} h={9.5} tone={0} opacity={0.8} />

      <Leaf x={18} y={56} angle={40} w={2.6} h={9.5} tone={1} opacity={0.8} />
      <Leaf x={30} y={50} angle={55} w={2.4} h={9} tone={0} opacity={0.8} />
      <Leaf x={42} y={44} angle={35} w={2.4} h={8.5} tone={1} opacity={0.78} />

      <SmallBloom x={46} y={26} scale={0.85} />
      <SmallBloom x={70} y={14} scale={0.7} />
      <Bud x={82} y={8} scale={0.65} />
      <Bud x={58} y={40} scale={0.55} />
    </svg>
  );
}
