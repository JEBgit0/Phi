// Page for a sidebar item of kind 'page' (e.g. a project): title plus the item's content.
import type { Page } from '../types'
import type { PageItem } from '../sections'
import GoldenRatio from '../components/GoldenRatio';

export default function ItemPage({ item, onNavigate }: {item: PageItem, onNavigate: (page: Page) => void}) {
    const Content = item.content;
    return(
        <div className="model-page">
            <button className="corner-button" onClick = {() => onNavigate('home')}>← Home</button>
            <GoldenRatio width={200} />
            <h1 className="big-title">{item.title}</h1>
            <Content />
        </div>
    );
}
