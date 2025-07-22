import {
    Assets,
    ColorMatrixFilter,
    Point,
    Sprite,
    Texture,
    Ticker,
} from "pixi.js";
import type { Container, ImageSource } from "pixi.js";
import { dispatchNoticeEvent } from "@/events/notice";
import line from "../assets/board-line.svg";
import background from "../assets/desk.webp";
import { Bloc } from "./pieces/piece";
import type { Piece } from "./pieces/piece";
import { SelectBox } from "./select-box";
import { Situation } from "./situation";

type StepRecordType = { from: Point; to: Point; removed: Piece | null };

const aiResultRegex = /^move:([a-i][0-9][a-i][0-9])/;

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
    private __turnPeace = 0; // 未吃子的回合累计数
    private __aiTakeOver: Bloc.BLACK | Bloc.RED | null = null;

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
        filter.brightness(1.2, true);
        this.__background.filters = filter;

        stage.addChild(this.__background);
        stage.addChild(this.__self);
        this.__ticker.minFPS = 30;
        this.__ticker.maxFPS = 60;
        this.__situation = new Situation(
            this.__blockSize,
            stage,
            this.__clickHandler.bind(this),
        );
        this.__fromBox = new SelectBox(
            new Point(1, 1),
            __blockSize,
            this.__situation.container,
        );
        this.__toBox = new SelectBox(
            new Point(1, 1),
            __blockSize,
            this.__situation.container,
        );
        this.__selectedBox = new SelectBox(
            new Point(1, 1),
            __blockSize,
            this.__situation.container,
        );
    }

    public get turn() {
        return this.__turn;
    }

    public set blockSize(blockSize: number) {
        this.__situation.blockSize = blockSize;
        this.__selectedBox.blockSize = blockSize;
        this.__fromBox.blockSize = blockSize;
        this.__toBox.blockSize = blockSize;

        this.__background.width = blockSize * 10;
        this.__background.height = blockSize * 10;

        this.__self.width = blockSize * 10;
        this.__self.height = blockSize * 10;

        this.__blockSize = blockSize;
    }

    public set selected(target: Piece) {
        if (target.bloc !== this.__turn) return;

        this.__selectedPiece = target;
        this.__selectedBox.position = target.position;
        this.__selectedBox.visible = true;
    }

    public set isRedSide(value: boolean) {
        this.__situation.isRedSide = value;
    }

    public set isDeductive(value: boolean) {
        this.__situation.isDeductive = value;
    }

    public set aiTakeOver(value: Bloc.RED | Bloc.BLACK | null) {
        this.__aiTakeOver = value;
        if (this.__turn === value) this.__callAi();
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
        this.__turnPeace = 0;
    }

    private __callAi() {
        const fen = `${this.__situation.generateFen()} ${this.__turn === Bloc.RED ? "w" : "b"} - - ${this.__turnPeace} ${Math.floor(this.__history.length / 2) + 1}`;

        fetch(
            `https://www.chessdb.cn/chessdb.php?action=querybest&board=${encodeURIComponent(fen)}`,
            { method: "GET" },
        )
            .then((v) => v.text())
            .then((v) => {
                if (v.startsWith("nobestmove")) {
                    dispatchNoticeEvent({
                        mini: "已脱谱",
                        duration: 5,
                        level: "warning",
                    });
                    return;
                }

                const result = v.match(aiResultRegex);
                if (result === null || result[1] === void 0)
                    throw `云库返回结果错误，返回值应符合正则表达式 /^move:([a-i][0-9][a-i][0-9])/，实际值为 ${v}`;

                const from = new Point(
                    result[1].charCodeAt(0) - 96,
                    58 - result[1].charCodeAt(1),
                );
                const to = new Point(
                    result[1].charCodeAt(2) - 96,
                    58 - result[1].charCodeAt(3),
                );

                this.selected = this.__situation.getPieceAt(from);
                this.__clickHandler(this.__situation.getPieceAt(to));
            });
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
            if (step.removed === null) this.__turnPeace++;
            else this.__turnPeace = 0;
            this.__history.push(step);

            this.__turn = this.__turn === Bloc.RED ? Bloc.BLACK : Bloc.RED;

            this.__selectedBox.visible = false;
            this.__selectedPiece = null;

            this.__fromBox.position = step.from;
            this.__fromBox.visible = true;

            this.__toBox.visible = true;
            this.__toBox.position = step.to;

            if (this.__turn === this.__aiTakeOver) this.__callAi();
        }
    }
}
