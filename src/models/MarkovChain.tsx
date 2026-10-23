// Model: Markov chain of daily stock moves (Down/Flat/Up) from price CSVs, with the transition matrix,
// forecast plot and state diagram. The maths runs in C++ compiled to WASM.
import { useState, useEffect } from 'react';
import createMarkov from '../wasm/markov';
import MarkovDiagram from '../components/MarkovDiagram';

const STATES = ["Down", "Flat", "Up"];
const STEPS = 10;
const X_TICKS = [0, 2, 4, 6, 8 ,10];
const Y_TICKS = [0, 0.25, 0.5, 0.75, 1];
const COLORS = ["#c0392b", "#7f8c8d", "#27ae60"]
const W = 800;
const H = 450;
const ML = 50;          // margins 
const MR = 10;
const MT = 10;
const MB = 40;
interface Ticker { ticker: string; name: string; region: string};

export default function MarkovChain() {
    const [matrix, setMatrix] = useState<number[][] | null>(null);
    const [tickers, setTickers] = useState<Ticker[]>([]);
    const [start, setStart] = useState(2);
    const [path, setPath] = useState<number[][] | null>(null);
    
    function xOf(step: number): number {
        return ML + step / STEPS * (W - ML - MR);
    }
    function yOf(p: number): number {
        return MT + (1 - p) * (H - MT - MB);
    }
    useEffect(() => {
        async function loadTickers() {
            const response = await fetch(`${import.meta.env.BASE_URL}data/tickers.json`);
            const list = await response.json();
            setTickers(list);
        }
        loadPrices("AAPL");
        loadTickers();
    }, []);
    useEffect(() => {
        async function loadForecast() {
            if (!matrix) return;
            const markov = await createMarkov();
            setPath(markov.forecast(matrix, start, STEPS));
        }
        loadForecast();
    }, [matrix, start]);
    async function loadPrices(ticker: string) {
        const response = await fetch(`${import.meta.env.BASE_URL}data/${ticker}.csv`);
        const text = await response.text();
        const prices = 
            text.trim().split("\n").slice(1).map(line => Number(line.split(",")[1]));
        const markov = await
        createMarkov();
        const m = markov.transitionMatrix(prices);
        setMatrix(m);
    }
    return(
        <div className="model">
            <div className="model-text">
                <h2 className="big-title">Markov Chains</h2>
                <div className="model-body">
                    <h3>How to use it</h3>
                    <p>
                        Pick a stock in the selector, and its transition matrix appears below it: rows are
                        today's state, columns are tomorrow's. Under "Today was", choose Down, Flat or Up to
                        set where the forecast starts. The plot shows the chance of each state for every day
                        ahead, in the same colours as the diagram. The diagram draws the matrix as arrows:
                        thicker arrows are more likely moves, and the outlined state is today.
                    </p>
                    <h3>Can yesterday predict tomorrow's stock price?</h3>
                    <p>
                        A Markov chain jumps between a few states, and the chance of the next state depends
                        only on the current one. A transition matrix holds it all: row i, column j is the
                        probability of moving from state i to state j.
                    </p>
                    <p>
                        Here the states are a stock's daily moves: Down (below −1%), Flat (−1% to +1%) and
                        Up (above +1%), counted from two years of daily closing prices.
                    </p>
                    <p>
                        If yesterday predicted today, the rows would look very different. They are fairly
                        similar for every stock, with one exception: a big move in either direction is more
                        often followed by another big move. Economists call this volatility clustering: the
                        size of moves is somewhat predictable, their direction is not.
                    </p>
                    <p>
                        In the plot, whatever you pick as today, the three lines settle at the same levels
                        within a few days. This is the chain's stationary distribution: the long-run share
                        of Down, Flat and Up days.
                    </p>
                    <p>
                        That is the weak form of the Efficient Market Hypothesis: past prices say little
                        about future prices, because any pattern that could be traded on gets traded away.
                        The result is the same for the stocks from the US, Europe and Oslo.
                    </p>
                    <p className="quote">
                        The data is downloaded with Python, and the matrix and forecast are computed
                        in C++, compiled to WebAssembly, directly in your browser.
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
                            textAnchor="middle">{t}</text>
                        </g>
                    ))}
                    <line x1={ML} x2={ML} y1={MT} y2={H - MB} stroke="currentColor" />
                    <text x={ML + (W - ML - MR) / 2} y={H - 5} >days ahead</text>
                    {Y_TICKS.map(t =>(
                        <g key={t}>
                            <line x1={ML - 5} x2={ML} y1={yOf(t)} y2={yOf(t)} stroke="currentColor" />
                            <text className="tick" x={ML - 8} y={yOf(t)}
                            textAnchor="end" dominantBaseline="middle">{t.toFixed(2)}</text>
                        </g>
                    ))}
                    <text transform={`translate(15, ${MT + (H - MT - MB) / 2}) rotate(-90)`} 
                    textAnchor="middle" >probability</text>
                    {path && STATES.map((s,k) => (
                        <polyline key={s} fill="none" strokeWidth={2} stroke={COLORS[k]}
                        points={path.map((v, step) => `${xOf(step)},${yOf(v[k])}`).join(' ')} />
                    ))}
                </svg>
                <div className="model-controls">
                    <div className="model-matrix">
                        <select onChange={e => loadPrices(e.target.value)}>
                            {tickers.map(t => (
                                <option key={t.ticker} value={t.ticker}>
                                    {t.name} ({t.region})
                                </option>
                            ))}
                        </select>
                        {matrix && (
                            <table>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        {STATES.map(s => <th key={s}>{s}</th>)}
                                    </tr>
                                    {matrix.map((row, i) => (
                                        <tr key={STATES[i]}>
                                            <th>{STATES[i]}</th>
                                            {row.map((p, j) => <td key={j}>{p.toFixed(2)}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <p>
                            Today was: {" "}
                            {STATES.map((s, i) => (
                                <button key={s} onClick={() => setStart(i)} style={{ color: COLORS[i] }} >{s}</button>
                            ))}
                        </p>
                    </div>
                    <div className="model-stats">
                        {matrix && <MarkovDiagram matrix={matrix} start={start} colors={COLORS} states={STATES} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
