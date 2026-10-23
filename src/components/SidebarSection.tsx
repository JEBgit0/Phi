// One sidebar heading with its items: pages open in the site, links open in a new tab, text is not clickable.
import type { Page } from '../types'
import type { Section } from '../sections'

export default function SidebarSection({ section, onNavigate }: {section: Section, onNavigate: (page: Page) => void}) {
    return (
        <div>
            <h2>{section.title}</h2>
            <ul>
                {section.items.map(item =>
                    <li
                    key={item.title}
                    onClick={item.kind === 'page' ? () => onNavigate(item.page) : undefined}
                    className={item.kind === 'page' ? 'click-course' : undefined}
                    >
                        {item.kind === 'link'
                            ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                            : item.title}
                    </li>)}
            </ul>
        </div>
    );
}
