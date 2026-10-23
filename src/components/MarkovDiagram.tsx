// State diagram for the Markov chain: one circle per state, arrows thickened by transition probability.
type Point = {x: number; y: number};
const R = 30;
const POSITIONS: Point[] = [
    {x: 60 , y: 210},
    {x: 150, y: 90},
    {x: 240, y: 210},
];
const LOOP_ANGLES: number[] = [3 * Math.PI / 4, -Math.PI / 2, Math.PI / 4];
const BEND = 25;
const ALPHA = 25 * Math.PI / 180;
const BETA = 30 * Math.PI / 180;
const K = 3.0 * R;
function atAngle(center: Point, angle: number, dist: number): Point {
    return { x: center.x + dist * Math.cos(angle), y: center.y + dist * Math.sin(angle) };
}
function arrowPath(a: Point, b: Point): { d: string; label: Point } {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const mx = (a.x + b.x) / 2; 
    const my = (a.y + b.y) / 2;
    const cx = mx + BEND * (-uy);
    const cy = my + BEND * ux;
    const s = towards(a, { x: cx, y: cy }, R);
    const e = towards(b, { x: cx, y: cy }, R + 10);
    const labelx = (s.x + 2 * cx + e.x) / 4;
    const labely = (s.y + 2 * cy + e.y) / 4;
    return { d: `M ${s.x} ${s.y} Q ${cx} ${cy} ${e.x} ${e.y}`, label: {x: labelx, y: labely} };
}
function towards(p: Point, c: Point, dist: number): Point{
    const dx = c.x - p.x;
    const dy = c.y - p.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    return { x: p.x + ux * dist, y: p.y + uy * dist };
}
function loopPath(center: Point, theta: number): { d: string; label: Point } {
    const s = atAngle(center, theta - ALPHA, R);
    const c1 = atAngle(center, theta - BETA, K);
    const c2 = atAngle(center, theta + BETA, K);
    const e = atAngle(center, theta + ALPHA, R + 10);
    const labelx = (s.x + 3 * c1.x + 3 * c2.x + e.x) / 8;
    const labely = (s.y + 3 * c1.y + 3 * c2.y + e.y) / 8;
    return { d: `M ${s.x} ${s.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${e.x} ${e.y}`, label: {x: labelx, y: labely} };
}
export default function MarkovDiagram({ matrix, start, colors, states }: 
    { matrix: number[][], start: number, colors: string[], states: string[] }) {
    return <svg viewBox="0 0 300 300" >
        <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX={0} refY={5} markerWidth={10} markerHeight={10}
                markerUnits="userSpaceOnUse" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
        </defs>
        {matrix.map((row, i) => 
            row.map((p, j) => {
                const arrow = i === j ? loopPath(POSITIONS[i], LOOP_ANGLES[i]) : arrowPath(POSITIONS[i], POSITIONS[j]);
                return (
                    <g key={`${i} - ${j}`}>
                        <path  d={arrow.d} fill="none" stroke="currentColor" strokeWidth={1 + 6 * p} markerEnd="url(#arrow)"/>
                        <text x={arrow.label.x} y={arrow.label.y} textAnchor="middle" dominantBaseline="middle" fontSize={12} 
                        stroke="var(--bg)" strokeWidth={4} paintOrder="stroke" fill="currentColor"
                        >{p.toFixed(2)}
                        </text>
                    </g>
                )
            })
        )}
        {states.map((s, i) => (
            <g key={s}>
                <circle stroke="currentColor" strokeWidth={i === start ? 4 : 0} cx={POSITIONS[i].x} 
                    cy={POSITIONS[i].y} r={R} fill={colors[i]}>
                </circle>
                <text x={POSITIONS[i].x} y={POSITIONS[i].y} textAnchor="middle" 
                    dominantBaseline="middle" fontSize={16} >{s}
                </text>
            </g>
        ))}
    </svg>
}