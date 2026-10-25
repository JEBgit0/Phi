// Course list in the sidebar, grouped by semester. Semesters without courses are hidden.
import { courses, semesters } from '../courses'
import type { Sem } from '../courses'

function Semester({ semes }: {semes: Sem}) {
    return (
        <div>
            <h3>{semes.title}</h3>
            <ul>
                {courses
                .filter(course => course.semester === semes.sem)
                .map(course =>
                    <li key={course.code}>
                        {course.code} - {course.title}
                    </li>)}
            </ul>
        </div>
    );
}
export default function CourseList(){
    return (
        <>
            {semesters
            .filter(s => courses.some(course => course.semester === s.sem))
            .map(s =>
                <Semester key={s.sem} semes={s} />)}
        </>
    );
}