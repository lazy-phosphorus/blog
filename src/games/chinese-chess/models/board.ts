import {
    Assets,
    ColorMatrixFilter,
    Point,
    Sprite,
    Texture,
    Ticker,
} from "pixi.js";
import type { Container, ImageSource } from "pixi.js";
import line from "../assets/board-line.svg";
import background from "../assets/desk.webp";
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
    private readonly __ticker = new Ticker();
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
            this.__background.texture = v;
        });

        const filter = new ColorMatrixFilter();
        filter.brightness(1.25, true);
        filter.saturate(0.25, true);
        this.__background.filters = filter;

        stage.addChild(this.__background);
        stage.addChild(this.__self);
        this.__ticker.minFPS = 30;
        this.__ticker.maxFPS = 60;
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

    public regret() {
        const step = this.__history.pop();
        if (step === void 0) return;

        this.__situation.traceBack(step.from, step.to, step.removed);
        this.__selectedPiece = null;
        this.__turn = this.__turn === Bloc.RED ? Bloc.BLACK : Bloc.RED;

        const current = this.__history[this.__history.length - 1];
        if (current === void 0) {
            this.__fromBox.visible = false;
            this.__toBox.visible = false;
        } else {
            this.__fromBox.position = current.from;
            this.__toBox.position = current.to;
        }

        return;
    }

    public reset() {
        this.__situation.reset();
        this.__fromBox.visible = false;
        this.__toBox.visible = false;
        this.__selectedBox.visible = false;
        this.__selectedPiece = null;
        this.__history.splice(0);
        this.__turn = Bloc.RED;
    }

    private __clickHandler(target: Piece) {
        console.log(target);
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
