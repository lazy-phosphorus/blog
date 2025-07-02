import music0 from "@/assets/music/0/audio.mp3";
import cover0 from "@/assets/music/0/cover.webp";
import music1 from "@/assets/music/1/audio.mp3";
import cover1 from "@/assets/music/1/cover.webp";
import music2 from "@/assets/music/2/audio.mp3";
import cover2 from "@/assets/music/2/cover.webp";
import music3 from "@/assets/music/3/audio.mp3";
import cover3 from "@/assets/music/3/cover.webp";
import music4 from "@/assets/music/4/audio.mp3";
import cover4 from "@/assets/music/4/cover.webp";

export interface Music {
    title: string;
    src: string;
    author: string;
    cover: string;
}

export const musicList: Music[] = [
    {
        title: "夜曲（苏联版）",
        cover: cover0,
        src: music0,
        author: "快乐严东楼",
    },
    {
        title: "自动化印记",
        cover: cover1,
        src: music1,
        author: "炙弹冰",
    },
    {
        title: "世界燃烧吧",
        cover: cover2,
        src: music2,
        author: "度娘你要闹哪样",
    },
    {
        title: "幻想圣人网友",
        cover: cover3,
        src: music3,
        author: "司天紫成",
    },
    {
        title: "共运の川流",
        cover: cover4,
        src: music4,
        author: "狄蒙Meng",
    },
];
