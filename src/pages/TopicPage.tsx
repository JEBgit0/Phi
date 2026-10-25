// Shell around a topic's model, with a back button to the models page.
import type { Page } from '../types'
import type { Topic } from '../courses'

export default function TopicPage({ topic, onNavigate }: {topic: Topic, onNavigate: (page: Page) => void}) {
    // JSX needs a capitalized name to treat something as a component
    const Model = topic.model;
    return(
        <div className="topic-page">
            <button className="corner-button" onClick = {() => onNavigate('models')}>← Models</button>
            <div className="model-wrap">
                <Model />
            </div>
        </div>
    );
}
