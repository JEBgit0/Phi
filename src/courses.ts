// Course data: every course, its topics and their models, plus the semester titles.
// Add a course or topic here and the sidebar, pages and Page type follow.
import type { ComponentType } from 'react';
import type { Page } from './types';
import LawOfLargeNumbers from './models/LawOfLargeNumbers';
import MarkovChain from './models/MarkovChain';

// One box on a course page, and the page it opens.
export interface Topic<Id extends string = Page> {
    id: Id;
    title: string;
    subtitle: string;
    model: ComponentType;
}

// A course in the sidebar. Courses with a page also get a course page with their topics.
export interface Course<Id extends string = Page> {
    code: string;
    title: string;
    semester: number;
    page?: Id;
    topics?: readonly Topic<Id>[];
}

export interface Sem {
    sem: number;
    title: string;
}

const courseData = [
    {
        code: 'MST0401',
        title: 'Mathematics and Quantitative Methods',
        semester: 1,
        page: 'mst0401',
        topics: [
            {id: 'mst0401-statistics', title: 'Statistics', subtitle: 'law of large numbers', model: LawOfLargeNumbers},
            {id: 'mst0401-mathematics', title: 'Mathematics', subtitle: 'markov chains', model: MarkovChain},
        ],
    },
    {
        code: 'MST0441', 
        title:  'Consumers, Trade, and Business Strategy', 
        semester: 1,
    },
    {
        code: 'MST0440', 
        title:  'Macroeconomic Analysis', 
        semester: 1,
    },
    {
        code: 'MST0400', 
        title:  'Business Economics', 
        semester: 1,
    },
] as const satisfies readonly Course<string>[];

export type CourseData = (typeof courseData)[number];
export const courses: readonly Course[] = courseData;

export const semesters: Sem [] = [
    {sem: 1, title: 'First Semester'},
    {sem: 2, title: 'Second Semester'},
    {sem: 3, title: 'Third Semester'},
    {sem: 4, title: 'Fourth Semester'},
]
