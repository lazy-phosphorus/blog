import { Point } from "pixi.js";
import type { Situation } from "../situation";
import { Bloc, Piece } from "./piece";
import type { IMovable } from "./piece";

export class Rook extends Piece implements IMovable {
    protected override readonly __code;

    constructor(bloc: Bloc, blockSize: number) {
        super(bloc, "車", blockSize);
        this.__code = bloc === Bloc.RED ? "R" : "r";
    }

    public override movable(to: Point, situation: Situation) {
        const from = this.position;

        // 不允许斜向行棋
        if (from.x !== to.x && from.y !== to.y) return false;

        if (from.x !== to.x) {
            // 横向行棋
            for (
                let i = Math.min(from.x, to.x) + 1;
                i < Math.max(from.x, to.x);
                i++
            ) {
                // 不允许有阻挡
                if (
                    situation.getBlocOfPieceAt(new Point(i, from.y)) !==
                    Bloc.SPACE
                )
                    return false;
            }
        } else {
            // 纵向行棋
            for (
                let i = Math.min(from.y, to.y) + 1;
                i < Math.max(from.y, to.y);
                i++
            ) {
                // 不允许有阻挡
                if (
                    situation.getBlocOfPieceAt(new Point(from.x, i)) !==
                    Bloc.SPACE
                )
                    return false;
            }
        }

        return true;
    }
}
