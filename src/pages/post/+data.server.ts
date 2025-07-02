import { readdir } from "fs/promises";
import { resolve } from "path";
import type { DataAsync } from "vike/types";
import { srcPath } from "@/utils/path";
import type { DataType } from "./types";

export async function data(): ReturnType<DataAsync<DataType>> {
    return {
        posts: (
            await readdir(resolve(srcPath, "pages", "post", "(post)"))
        ).filter((v) => !v.startsWith("+")),
    };
}
