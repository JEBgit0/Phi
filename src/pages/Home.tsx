// Landing page: logo and the George Box quote, with a button that slides down to a short intro.
// There is no scrolling: both views sit on one track that CSS moves up or down.
import { useState } from 'react';
import GoldenRatio from '../components/GoldenRatio'

export default function Home() {
    const [showIntro, setShowIntro] = useState(false);
    return(
        <div className='home'>
            <div className={showIntro ? 'home-track show-intro' : 'home-track'}>
                <section className="home-section" inert={showIntro}>
                    <GoldenRatio width={485} />
                    <h1>φ</h1>
                    <blockquote className="quote">“All models are wrong, but some are useful.”</blockquote>
                    <cite>George E.P. Box</cite>
                    <button className="scroll-button" aria-label="Scroll to intro"
                        onClick={() => setShowIntro(true)}>↓</button>
                </section>
                <section className="home-section intro" inert={!showIntro}>
                    <svg className="menu-hint" viewBox="0 0 120 60" width={120} height={60}>
                        <defs>
                            <marker id="hint-arrow" viewBox="0 0 10 10" refX={5} refY={5}
                                markerWidth={5} markerHeight={5} orient="auto">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                            </marker>
                        </defs>
                        <path d="M 68 48 Q 20 48 12 10" fill="none" stroke="currentColor" strokeWidth={2}
                            markerEnd="url(#hint-arrow)" />
                        <text x={74} y={52} fontSize={14} fill="currentColor">menu</text>
                    </svg>
                    <button className="scroll-button up" aria-label="Back to top"
                        onClick={() => setShowIntro(false)}>↑</button>
                    <h1 className="big-title">Julian E. Brodahl</h1>
                    <h2 className="intro-subtitle">A simple page, with extra quirks</h2>
                    <p className="intro-text">
                        <strong>This is a work in progress.</strong> You can click around the page:
                        some things will take you to different pages, others won't. I will add things
                        as I am studying, and hopefully you find something mildly interesting.
                    </p>
                </section>
            </div>
        </div>
    );
}
