// Shared types. Page is derived from the data in courses.ts and sections.ts,
// so it never has to be edited by hand.
import type { CourseData } from './courses';
import type { ItemData } from './sections';

type PageId<C> = C extends { page: infer P } ? P : never;
type TopicId<C> = C extends { topics: readonly { id: infer I }[] } ? I : never;

export type Page = 'home' | 'models' | TopicId<CourseData> | PageId<ItemData>;

export type Theme = 
    'light' | 'dark' | 'forest' | 'cream';