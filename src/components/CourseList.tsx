// Course list in the sidebar, grouped by semester. Semesters without courses are hidden.
import type { Page } from '../types'
import { courses, semesters } from '../courses'
import type { Sem } from '../courses'

function Semester({ semes, onNavigate }: {semes: Sem, onNavigate: (page: Page) => void}) {
    return (
        <div>
            <h3>{semes.title}</h3>
            <ul>
                {courses
                .filter(course => course.semester === semes.sem)
                .map(course =>
                    <li
                    key={course.code}
                    onClick={() => course.page && onNavigate(course.page)}
                    className={ course.page && 'click-course' }
                    >
                        {course.code} - {course.title}
                    </li>)}
            </ul>
        </div>
    );
}
export default function CourseList({ onNavigate }: {onNavigate: (page: Page) => void}){
    return (
        <>
            {semesters
            .filter(s => courses.some(course => course.semester === s.sem))
            .map(s =>
                <Semester key={s.sem} semes={s} onNavigate={onNavigate} />)}
        </>
    );
}