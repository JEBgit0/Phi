// Registry: every page id mapped to a function that draws that page.
// Built from courses.ts and sections.ts, so new pages show up here automatically.
import type { ReactNode } from 'react';
import type { Page } from './types';
import Home from './pages/Home';
import ModelPage from './pages/ModelPage';
import TopicPage from './pages/TopicPage';
import ItemPage from './pages/ItemPage';
import { courses } from './courses';
import { sections } from './sections';

type Render = (onNavigate: (page: Page) => void) => ReactNode;

const entries: [Page, Render][] = [
    ['home', () => <Home />],
    ['models', nav => <ModelPage onNavigate={nav} />],
    ...courses.flatMap(c => (c.topics ?? []).map((t): [Page, Render] =>
        [t.id, nav => <TopicPage topic={t} onNavigate={nav} />])),
    ...sections.flatMap(s => s.items.flatMap((i): [Page, Render][] =>
        i.kind === 'page' ? [[i.page, nav => <ItemPage item={i} onNavigate={nav} />]] : [])),
];

export const registry = Object.fromEntries(entries) as Record<Page, Render>;

export function isPage(s: string): s is Page {
    return Object.hasOwn(registry, s);
}
