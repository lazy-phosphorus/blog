import { Assets, Sprite, Texture } from "pixi.js";
import type { Container, ImageSource, Point } from "pixi.js";
import file from "../assets/chess-select-box.svg";
import { boardPoint2ScreenPoint } from "../utils/point-convert";

export class SelectBox {
    private readonly __self = new Sprite({
        texture: Texture.EMPTY,
        visible: false,
        anchor: 0.5,
    });

    constructor(
        position: Point,
        private __blockSize: number,
        stage: Container,
    ) {
        Assets.load<Texture<ImageSource>>(file).then(
            (v) => (this.__self.texture = v),
        );

        this.__self.position = boardPoint2ScreenPoint(position, __blockSize);
        this.__self.width = __blockSize;
        this.__self.height = __blockSize;
        stage.addChild(this.__self);
    }

    public set blockSize(value: number) {
        this.__self.width = value;
        this.__self.height = value;
        this.__blockSize = value;
    }

    public set position(point: Point) {
        this.__self.position = boardPoint2ScreenPoint(point, this.__blockSize);
    }

    public set visible(value: boolean) {
        this.__self.visible = value;
    }
}
