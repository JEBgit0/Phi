// The models page: one box for every model across all courses, each opening that model.
import type { Page } from '../types'
import { courses } from '../courses'
import GoldenRatio from '../components/GoldenRatio';
export default function ModelPage({ onNavigate }: {onNavigate: (page: Page) => void}) {
    return(
        <div className="model-page">
            <button className="corner-button" onClick = {() => onNavigate('home')}>← Home</button>
            <p></p>
            <GoldenRatio width={200} />
            <h1 className="big-title">Models</h1>
            <div className="model-grid">
                {courses.flatMap(course => (course.topics ?? []).map(topic =>
                    <div key={topic.id} className="model-card" onClick = {() => onNavigate(topic.id)}>
                        <h2>{topic.title}</h2>
                        <p>{topic.subtitle}</p>
                        <p className="quote">{course.code}</p>
                    </div>))}
            </div>
        </div>
    );
}
