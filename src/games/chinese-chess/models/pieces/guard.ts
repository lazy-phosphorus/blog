import type { Point } from "pixi.js";
import { Bloc, Piece } from "./piece";
import type { IMovable } from "./piece";

export class Guard extends Piece implements IMovable {
    constructor(bloc: Bloc, blockSize: number) {
        super(bloc, bloc === Bloc.RED ? "仕" : "士", blockSize);
    }

    public override movable(to: Point) {
        const from = this.position;

        // 必须斜线行棋，且横竖 1 格
        if (Math.abs(to.x - from.x) !== 1 || Math.abs(to.y - from.y) !== 1)
            return false;

        // 不允许超出九宫
        if (to.x <= 3 || 7 <= to.x) return false;
        if (this.bloc === Bloc.RED) return to.y >= 8;
        else return to.y <= 3;
    }
}
