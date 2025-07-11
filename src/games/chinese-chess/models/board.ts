import { Assets, Point, Sprite } from "pixi.js";
import type { ImageSource, SpriteOptions, Texture } from "pixi.js";
import file from "../assets/chess-board.svg";
import { Situation } from "./situation";

export class Board extends Sprite implements Sprite {
    private readonly situation = new Situation();

    constructor(options?: SpriteOptions) {
        super({
            eventMode: "static",
            position: new Point(0, 0),
            ...options,
        });
        Assets.load<Texture<ImageSource>>(file).then((v) => (this.texture = v));
    }

    public resize(blockSize: number) {
        this.width = blockSize * 9;
        this.height = blockSize * 10;
    }
}
