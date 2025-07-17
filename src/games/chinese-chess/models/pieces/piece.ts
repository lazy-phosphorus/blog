import {
    Assets,
    BitmapText,
    ColorMatrixFilter,
    Container,
    Point,
    Sprite,
    TextStyle,
    Texture,
} from "pixi.js";
import type { ImageSource } from "pixi.js";
import border from "../../assets/piece-border.svg";
import background from "../../assets/piece.webp";
import {
    boardPoint2ScreenPoint,
    screenPoint2BoardPoint,
} from "../../utils/point-convert";
import type { Situation } from "../situation";

export enum Bloc {
    RED,
    BLACK,
    SPACE,
}

export interface IMovable {
    move(to: Point, currentTurn: Bloc, situation: Situation): boolean;
}

export abstract class Piece implements IMovable {
    protected readonly __self = new Container({
        eventMode: "passive",
    });

    private readonly __background = new Sprite({
        eventMode: "none",
        texture: Texture.EMPTY,
        position: new Point(0, 0),
    });
    private readonly __circle: Sprite = new Sprite({
        position: new Point(0, 0),
        roundPixels: true,
        eventMode: "static",
        texture: Texture.EMPTY,
    });
    private readonly __text = new BitmapText({
        anchor: 0.5,
        style: new TextStyle({
            fontFamily: ["Fira Code Variable", "Noto Sans SC Variable"],
            align: "center",
        }),
    });

    constructor(
        private readonly __bloc: Bloc,
        private readonly __type: string,
        private __blockSize: number,
    ) {
        Assets.load<Texture<ImageSource>>(border).then(
            (v) => (this.__circle.texture = v),
        );
        Assets.load<Texture<ImageSource>>(background).then(
            (v) => (this.__background.texture = v),
        );

        const filter = new ColorMatrixFilter();
        filter.brightness(1.1, true);
        this.__background.filters = filter;

        if (__bloc === Bloc.SPACE) this.__self.alpha = 0;

        this.__text.text = this.__type;
        this.__text.style.fill = __bloc === Bloc.RED ? "#F44336" : "#212121";
        this.resize();
        this.__self.addChild(this.__background);
        this.__self.addChild(this.__circle);
        this.__self.addChild(this.__text);
    }

    public get bloc() {
        return this.__bloc;
    }

    public get position() {
        return screenPoint2BoardPoint(
            this.__self.position.clone(),
            this.__blockSize,
        );
    }

    public set position(point: Point) {
        this.__self.position = boardPoint2ScreenPoint(point, this.__blockSize);
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

    public onClick(handler: (event: Piece) => void) {
        this.__circle.on("pointertap", () => handler(this));
    }

    public addToStage(stage: Container) {
        stage.addChild(this.__self);
    }

    public removeFromStage() {
        this.__self.removeFromParent();
    }

    public move(to: Point, currentTurn: Bloc, situation: Situation) {
        // 对方回合
        if (this.bloc !== currentTurn) return false;

        // 友军
        if (situation.getBlocOfPieceAt(to) === this.bloc) return false;

        // 违反行棋规则
        if (!this.movable(to, situation)) return false;

        this.position = to;
        return true;
    }

    private resize() {
        this.__background.height = this.__blockSize;
        this.__background.width = this.__blockSize;
        this.__circle.height = this.__blockSize;
        this.__circle.width = this.__blockSize;

        this.__text.position = new Point(
            this.__blockSize / 2,
            this.__blockSize / 2,
        );
        this.__text.style.fontSize = this.__blockSize / 1.85;
        this.__text.style.stroke = {
            color: "#d4d4d4",
            width: this.__blockSize / 15,
        };

        this.__self.height = this.__blockSize;
        this.__self.width = this.__blockSize;
        this.__self.pivot.set(this.__blockSize / 2, this.__blockSize / 2);
    }

    protected abstract movable(to: Point, situation: Situation): boolean;
}
