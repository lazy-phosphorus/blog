export type FrontmatterType = {
    title: string;
    draft: boolean;
    date: {
        publish: Date;
        modify: Date;
    };
    description: string;
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
