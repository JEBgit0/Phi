// A course's page: its title and one box per topic, each opening that topic's model.
import type { Page } from '../types'
import type { Course } from '../courses'
import GoldenRatio from '../components/GoldenRatio';
export default function CoursePage({ course, onNavigate }: {course: Course, onNavigate: (page: Page) => void}) {
    return(
        <div className="course-page">
            <button className="corner-button" onClick = {() => onNavigate('home')}>← Home</button>
            <p></p>
            <GoldenRatio width={200} />
            <h1 className="big-title">{course.code} - {course.title}</h1>
            <div className="course-split">
                {course.topics?.map(topic =>
                    <div key={topic.id} className="course-half" onClick = {() => onNavigate(topic.id)}>
                        <h2>{topic.title}</h2>
                        <p>{topic.subtitle}</p>
                    </div>)}
            </div>
        </div>
    );
}