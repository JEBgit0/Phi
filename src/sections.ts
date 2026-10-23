// Sidebar sections (projects, exchange/internship, socials) and their items.
// Add an item here and it shows up in the sidebar; sections without items stay hidden.
import type { ComponentType } from 'react';
import type { Page } from './types';
import ComingSoon from './components/ComingSoon';

export type Item<Id extends string = Page> =
    | { kind: 'page'; title: string; page: Id; content: ComponentType }
    | { kind: 'link'; title: string; url: string }
    | { kind: 'text'; title: string };

export type PageItem = Extract<Item, { kind: 'page' }>;

export interface Section<Id extends string = Page> {
    title: string;
    items: readonly Item<Id>[];
}

const sectionData = [
    {
        title: 'Projects',
        items: [
            {kind: 'page', title: 'Visualizer', page: 'visualizer', content: ComingSoon},
            {kind: 'link', title: 'Colab course problems', url: 'https://github.com/JEBgit0/mst0441-colab'},
            {kind: 'link', title: 'HwTeX', url: 'https://github.com/JEBgit0/HwTex'},
        ],
    },
    {
        title: 'Exchange/Internship',
        items: [],
    },
    {
        title: 'Socials',
        items: [],
    },
] as const satisfies readonly Section<string>[];

export type ItemData = (typeof sectionData)[number]['items'][number];
export const sections: readonly Section[] = sectionData;
