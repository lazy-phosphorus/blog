import { resolve } from "path";

export const srcPath = import.meta.env.PROD
    ? resolve(import.meta.dirname, "..", "..", "..", "src")
    : resolve(import.meta.dirname, "..");
