// Shell around a topic's model, with a back button to its course.
import type { Page } from '../types'
import type { Course, Topic } from '../courses'

export default function TopicPage({ course, topic, onNavigate }: {course: Course, topic: Topic, onNavigate: (page: Page) => void}) {
    // JSX needs a capitalized name to treat something as a component
    const Model = topic.model;
    return(
        <div className="topic-page">
            <button className="corner-button" onClick = {() => course.page && onNavigate(course.page)}>← {course.code}</button>
            <div className="model-page">
                <Model />
            </div>
        </div>
    );
}