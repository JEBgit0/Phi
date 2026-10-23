// Model: estimates π by Monte Carlo (C++ compiled to WASM) to show the law of large numbers.
import { useState } from 'react';
import createMonteCarlo from '../wasm/montecarlo.js';

const W = 750;
const H = 450;
const N = 1000000;
const POINTS = 500;
const yMin = 2.70;
const yMax =  3.60;
const ML = 50;          // margins 
const MR = 30;
const MT = 10;
const MB = 40;
const X_TICKS = [100, 1000, 10000, 100000, 1000000]
const Y_TICKS = [2.8, 3.0, 3.2, 3.4, 3.6]

export default function LawOfLargeNumbers() {
    const [result, setResult] = useState<{ n: number[], pi: number[] } | null>(null);

    async function runCpp() {
        const montecarlo = await createMonteCarlo();
        setResult(montecarlo.estimatePathLog(N, POINTS));
    }
    function xOf(n: number): number {
        const x = ML + Math.log10(n / 100) / Math.log10(N / 100) * (W - ML - MR)
        return x;
    }
    function yOf(v: number): number {
        const y = MT + (yMax - v) / (yMax - yMin) * (H - MT - MB)
        return y;
    }
    return(
        <div className="model">
            <div className="model-text">
                <h2 className="big-title">Law of Large Numbers</h2>
                <div className="model-body">
                    <h3>Estimating π with Monte Carlo simulation</h3>
                    <p>
                        The law of large numbers says that as you repeat a random experiment
                        more times, the average result gets closer to the expected value.
                    </p>
                    <p>
                        This program uses it to estimate π. Random points are thrown into a
                        1 × 1 square that contains a quarter circle with radius 1. The quarter
                        circle covers π/4 of the square, so the share of points that land
                        inside approaches π/4, and 4 × (inside / total) approaches π.
                    </p>
                    <p>
                        The plot shows the estimate as the number of points n grows from 100
                        to 1,000,000, on a logarithmic axis. Early on the estimate jumps
                        around; as n grows it settles towards the red line at the true value
                        of π. The error shrinks roughly like 1/√n, so every 100 times more
                        points gives about one more correct digit.
                    </p>
                    <p className="quote">
                        The simulation runs in C++, compiled to WebAssembly, directly in your
                        browser.
                    </p>
                </div>
            </div>
            <div className="model-box model-stack">
                <svg viewBox={`0 0 ${W} ${H}`} className="plot">
                    <line x1={ML} x2={W - MR} y1={H - MB} y2={H - MB} stroke="currentColor" />
                    {X_TICKS.map(t => (
                        <g key={t}>
                            <line x1={xOf(t)} x2={xOf(t)} y1={H - MB} y2={H - MB + 5} stroke="currentColor" />
                            <text className="tick" x={xOf(t)} y={H - MB + 20} 
                            textAnchor="middle">{t.toLocaleString()}</text>
                        </g>
                    ))}
                    <line x1={ML} x2={ML} y1={MT} y2={H - MB} stroke="currentColor" />
                    <text x={ML + (W - ML - MR) / 2} y={H - 5} >n</text>
                    {Y_TICKS.map(t =>(
                        <g key={t}>
                            <line x1={ML - 5} x2={ML} y1={yOf(t)} y2={yOf(t)} stroke="currentColor" />
                            <text className="tick" x={ML - 8} y={yOf(t)}
                            textAnchor="end" dominantBaseline="middle" >{t.toFixed(1)}</text>
                        </g>
                    ))}
                    <text transform={`translate(15, ${MT + (H - MT - MB) / 2}) rotate(-90)`} textAnchor="middle" >estimate of π</text>
                    <line x1={ML} x2={W - MR} y1={yOf(Math.PI)} y2={yOf(Math.PI)}
                    stroke="red" strokeDasharray="4" />
                    {result && (<polyline points={result.pi.map(
                        (v, i) => `${xOf(result.n[i])},${yOf(v)}`
                        ).join(' ')} fill="none" stroke="currentColor" strokeWidth={1} />
                        )
                    }
                </svg>
                <div className="model-controls">
                    <button onClick={runCpp}>run<br />simulation</button>
                    <div className="model-stats">
                        <p>points: {result?.pi.length ?? '?'}</p>
                        <p>π ≈ {result?.pi.at(-1) ?? '?'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
