import { Assets, Point, Sprite, Texture } from "pixi.js";
import type { Container, ImageSource } from "pixi.js";
import background from "../assets/background.jpg";
import line from "../assets/chess-board.svg";
import { Bloc } from "./pieces/piece";
import type { Piece } from "./pieces/piece";
import { SelectBox } from "./select-box";
import { Situation } from "./situation";

type StepRecordType = { from: Point; to: Point; removed: Piece | null };

export class Board {
    private readonly __situation: Situation;
    private readonly __fromBox: SelectBox;
    private readonly __toBox: SelectBox;
    private readonly __selectedBox: SelectBox;
    private readonly __self = new Sprite({
        position: new Point(0, 0),
        texture: Texture.EMPTY,
    });
    private readonly __background = new Sprite({
        position: new Point(0, 0),
        texture: Texture.EMPTY,
    });

    private readonly __history: StepRecordType[] = [];

    private __turn = Bloc.RED;
    private __selectedPiece: null | Piece = null;

    constructor(
        private __blockSize: number,
        stage: Container,
    ) {
        Assets.load<Texture<ImageSource>>(line).then(
            (v) => (this.__self.texture = v),
        );
        Assets.load<Texture<ImageSource>>(background).then((v) => {
            v.source.scaleMode = "nearest";
            v.source.wrapMode = "repeat";
            this.__background.texture = v;
        });

        stage.addChild(this.__background);
        stage.addChild(this.__self);
        this.__fromBox = new SelectBox(new Point(1, 1), __blockSize, stage);
        this.__toBox = new SelectBox(new Point(1, 1), __blockSize, stage);
        this.__selectedBox = new SelectBox(new Point(1, 1), __blockSize, stage);
        this.__situation = new Situation(
            this.__blockSize,
            stage,
            this.__clickHandler.bind(this),
        );
    }

    public set blockSize(blockSize: number) {
        this.__situation.blockSize = blockSize;
        this.__selectedBox.blockSize = blockSize;
        this.__fromBox.blockSize = blockSize;
        this.__toBox.blockSize = blockSize;

        this.__background.width = blockSize * 9;
        this.__background.height = blockSize * 10;

        this.__self.width = blockSize * 9;
        this.__self.height = blockSize * 10;

        this.__blockSize = blockSize;
    }

    public set selected(target: Piece) {
        if (target.bloc !== this.__turn) return;

        this.__selectedPiece = target;
        this.__selectedBox.position = target.position;
        this.__selectedBox.visible = true;
    }

    public get turn() {
        return this.__turn;
    }

    private __clickHandler(target: Piece) {
        if (target.bloc === this.__turn) {
            this.selected = target;
            return;
        } else if (this.__selectedPiece === null) return;

        const step: StepRecordType = {
            from: this.__selectedPiece.position,
            to: target.position,
            removed: null,
        };
        const isMoved = this.__selectedPiece.move(
            target.position,
            this.__turn,
            this.__situation,
        );
        if (isMoved) {
            step.removed = this.__situation.syncBattleField(step.from, step.to);
            this.__history.push(step);

            this.__turn = this.__turn === Bloc.RED ? Bloc.BLACK : Bloc.RED;

            this.__selectedBox.visible = false;
            this.__selectedPiece = null;
            this.__fromBox.position = step.from;
            this.__fromBox.visible = true;
            this.__toBox.visible = true;
            this.__toBox.position = step.to;
        }
    }
}
