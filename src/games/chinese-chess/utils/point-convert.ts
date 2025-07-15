import { Point } from "pixi.js";

export function screenPoint2BoardPoint({ x, y }: Point, blockSize: number) {
    return new Point(
        Math.round(x / blockSize + 0.5),
        Math.round(y / blockSize + 0.5),
    );
}

export function boardPoint2ScreenPoint({ x, y }: Point, blockSize: number) {
    return new Point((x - 0.5) * blockSize, (y - 0.5) * blockSize);
}
