import { Assets, Point, Sprite } from "pixi.js";
import type { ImageSource, SpriteOptions, Texture } from "pixi.js";
import file from "../assets/chess-board.svg";
import { Situation } from "./situation";

const texture = await Assets.load<Texture<ImageSource>>(file);

export class Board extends Sprite implements Sprite {
    private readonly situation = new Situation();

    constructor(options?: SpriteOptions) {
        super({
            eventMode: "static",
            texture,
            position: new Point(0, 0),
            ...options,
        });
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
