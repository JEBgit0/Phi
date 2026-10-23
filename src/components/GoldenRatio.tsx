// Golden ratio logo: nested golden rectangles with the spiral, drawn as SVG.
import type { ReactNode } from 'react';
const PHI = (1 + Math.sqrt(5)) / 2;

export default function GoldenRatio({ width }: {width: number }) {
    const rects: ReactNode[] = [];
    const draws: ReactNode[] = [];
    const ups_x = [1, 1, -1, -1];
    const ups_y = [-1, 1, 1, -1];
    let size = 100;
    let stroke = 2;
    let x = 0;
    let y = 100;

    for (let i = 0; i < 10; i++) {
        const dx = ups_x[i % 4];
        const dy = ups_y[i % 4];
        const x0 = x;
        const y0 = y;

        const stroke0 = stroke;
        stroke = stroke * 0.8;
        const sw = (stroke + stroke0) / 2;

        x = x + size * dx;
        y = y + size * dy;

        const arc = `M ${x0} ${y0} A ${size} ${size} 0 0 1 ${x} ${y}`;

        draws.push(<path key={i} d={arc} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />);
        rects.push(<rect key={i} x={Math.min(x, x0)} y={Math.min(y, y0)} width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} />);
        
        size = size / PHI;
    }
    return(
        <svg viewBox="0 0 161.8034 100" width={width}>
            {rects}
            {draws}
        </svg>
    );
}