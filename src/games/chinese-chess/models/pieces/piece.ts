import {
    Assets,
    BitmapText,
    Circle,
    Container,
    Point,
    Sprite,
    TextStyle,
} from "pixi.js";
import type {
    ContainerOptions,
    FederatedPointerEvent,
    ImageSource,
    Optional,
    Size,
    Texture,
} from "pixi.js";
import {
    boardPoint2ScreenPoint,
    normalizePoint,
} from "../../utils/point-convert";
import file from "../assets/chess-piece.svg";
import type { Situation } from "../situation";

export enum Bloc {
    RED,
    BLACK,
    SPACE,
}

export interface IMovable {
    move(
        to: Point,
        currentTurn: Bloc,
        blockSize: number,
        situation: Situation,
    ): boolean;
}

export abstract class Piece
    extends Container<Sprite | BitmapText>
    implements Container<Sprite | BitmapText>, IMovable
{
    private readonly sprite: Sprite = new Sprite({
        position: new Point(0, 0),
        eventMode: "static",
        cursor: "pointer",
    });
    private readonly text: BitmapText = new BitmapText({
        anchor: 0.5,
        style: new TextStyle({
            fontFamily: ["Fira Code Variable", "Noto Sans SC Variable"],
            align: "center",
        }),
    });

    constructor(
        private readonly __bloc: Bloc,
        private readonly __type: string,
        options?: ContainerOptions<Sprite | BitmapText>,
    ) {
        super(options);

        Assets.load<Texture<ImageSource>>(file).then(
            (v) => (this.sprite.texture = v),
        );

        this.text.text = this.__type;
        this.resize();
        this.addChild(this.sprite);
        this.addChild(this.text);
    }

    public get bloc() {
        return this.__bloc;
    }

    public override set width(value: number) {
        super.width = value;
        this.resize();
    }

    public override set height(value: number) {
        super.height = value;
        this.resize();
    }
    public override setSize(
        value: number | Optional<Size, "height">,
        height?: number,
    ) {
        super.setSize(value, height);
        this.resize();
    }

    public onClick(handler: (event: FederatedPointerEvent) => void) {
        this.sprite.on("pointertap", handler);
    }

    public move(
        to: Point,
        currentTurn: Bloc,
        blockSize: number,
        situation: Situation,
    ) {
        // 对方回合
        if (this.bloc !== currentTurn) return false;

        // 友军
        if (
            situation.getBlocOfPieceAt(
                boardPoint2ScreenPoint(to, blockSize),
            ) === this.bloc
        )
            return false;

        // 违反行棋规则
        if (!this.movable(to, blockSize, situation)) return false;

        this.position = normalizePoint(to, blockSize);
        return true;
    }

    private resize() {
        this.pivot.set(this.width / 2, this.height / 2);
        this.sprite.setSize(this.width, this.height);
        this.sprite.hitArea = new Circle(
            this.width / 2,
            this.width / 2,
            this.width / 2,
        );
        this.text.position = new Point(this.width / 2, this.height / 2);
        this.text.style.fontSize = this.width / 1.85;
    }

    protected abstract movable(
        _to: Point,
        blockSize: number,
        situation: Situation,
    ): boolean;
}
