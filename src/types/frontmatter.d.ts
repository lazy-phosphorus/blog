import type { ComponentChildren } from "preact";

export type FrontmatterType = {
    title: string;
    draft: boolean;
    date: {
        publish: Date;
        modify: Date;
    };
    description: ComponentChildren;
    categories: string[];
    tags: string[];
    cover: string;
    readingTime: {
        text: string;
        minutes: number;
        time: number;
        words: number;
    };
};
