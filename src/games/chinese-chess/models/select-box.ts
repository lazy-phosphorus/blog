import { Assets, Sprite, Texture } from "pixi.js";
import type { Container, ImageSource, Point } from "pixi.js";
import file from "../assets/select-box.svg";
import {
    boardPoint2ScreenPoint,
    screenPoint2BoardPoint,
} from "../utils/point-convert";

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
        this.resize();
        stage.addChild(this.__self);
    }

    public set blockSize(value: number) {
        const boardPoint = screenPoint2BoardPoint(
            this.__self.position,
            this.__blockSize,
        );
        this.__self.position = boardPoint2ScreenPoint(boardPoint, value);
        this.__blockSize = value;
        this.resize();
    }

    public set position(point: Point) {
        this.__self.position = boardPoint2ScreenPoint(point, this.__blockSize);
    }

    public set visible(value: boolean) {
        this.__self.visible = value;
    }

    public set reverse(value: boolean) {
        this.__self.scale.y = value ? 1 : -1;
    }

    private resize() {
        this.__self.width = this.__blockSize;
        this.__self.height = this.__blockSize;
    }
}
