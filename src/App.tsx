// Root of the site: holds the current page and theme, keeps the page in sync with the URL hash,
// and draws the sidebar plus whatever the registry returns for the page.
import type { Theme, Page } from './types';
import { useEffect, useState } from 'react';
import './App.css'
import Sidebar from "./components/Sidebar";
import { registry, isPage } from './pages';

// "#mst0401-statistics" -> 'mst0401-statistics'
function pageFromHash(): Page {
    const hash = window.location.hash.slice(1);
    return isPage(hash) ? hash : 'home';
}

export default function App() {
    const [visible, setVisible] = useState(false);
    const [page, setPage] = useState<Page>(pageFromHash);

    // Page -> URL
    useEffect(() => {
        window.location.hash = page;
    }, [page]);

    // URL -> page (back/forward buttons, pasted links)
    useEffect(() => {
        const onHash = () => setPage(pageFromHash());
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') ?? 'cream') as Theme);
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }, [theme] );

    // Sidebar links also close the sidebar
    function navigate(p: Page) {
        setPage(p);
        setVisible(false);
    }

    return (
        <div className="layout">
            <button className="menu-button" onClick={() => setVisible(!visible)}>
                ☰
            </button>
            {visible && <Sidebar onNavigate={navigate} onTheme={setTheme} theme={theme} />}
            {registry[page](setPage)}
        </div>
    );
}
