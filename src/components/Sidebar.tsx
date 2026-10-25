// Left navigation: home button, theme picker, the models link, the course list and every section from sections.ts.
import CourseList from "./CourseList";
import SidebarSection from "./SidebarSection";
import type { Page, Theme } from '../types'
import { sections } from '../sections'

export default function Sidebar({ onNavigate, onTheme, theme }: 
    {onNavigate: (page: Page) => void; 
        onTheme: (theme: Theme) => void;
        theme: Theme;
    }) {
    return(
        <nav className="sidebar">
            <button className="home-button" onClick = {() => onNavigate('home')}>⌂</button>
            <select className="theme-select" value={theme}  onChange={e => onTheme(e.target.value as Theme)} >
                <option value="light" >Light Theme</option>
                <option value="cream" >Cream Theme</option>
                <option value="dark" >Dark Theme</option>
                <option value="forest" >Forest Theme</option>
            </select>
            <p className="site-title">Welcome to φ</p>
            <p className="author">Julian E. Brodahl </p>
            <button className="click-course model-home" onClick={() => onNavigate('models')}>›MODELS‹</button>
            {sections
            .filter(s => s.items.length > 0)
            .map(s =>
                <SidebarSection key={s.title} section={s} onNavigate={onNavigate} />)}
            <h2> Courses at BI</h2>
            <CourseList />
        </nav>
    )
}