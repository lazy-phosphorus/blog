import type { Point } from "pixi.js";
import { Bloc, Piece } from "./piece";
import type { IMovable } from "./piece";

export class General extends Piece implements IMovable {
    protected override readonly __code;

    constructor(bloc: Bloc, blockSize: number) {
        super(bloc, bloc === Bloc.RED ? "帥" : "將", blockSize);
        this.__code = bloc === Bloc.RED ? "K" : "k";
    }

    public override movable(to: Point) {
        const from = this.position;

        // 仅能横或竖 1 格
        if (Math.abs(to.x - from.x) + Math.abs(to.y - from.y) !== 1)
            return false;

        // 不允许超出九宫
        if (to.x <= 3 || 7 <= to.x) return false;
        if (this.bloc === Bloc.RED) return to.y >= 8;
        else return to.y <= 3;
    }
}
