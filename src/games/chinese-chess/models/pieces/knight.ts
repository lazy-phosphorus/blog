import { Point } from "pixi.js";
import type { Situation } from "../situation";
import { Bloc, Piece } from "./piece";
import type { IMovable } from "./piece";

export class Knight extends Piece implements IMovable {
    protected override readonly __code;

    constructor(bloc: Bloc, blockSize: number) {
        super(bloc, "馬", blockSize);
        this.__code = bloc === Bloc.RED ? "N" : "n";
    }

    public override movable(to: Point, situation: Situation) {
        const from = this.position;

        // 不允许直线行棋
        if (from.x === to.x || from.y === to.y) return false;

        // 日字行棋
        if (Math.abs(to.x - from.x) + Math.abs(to.y - from.y) !== 3)
            return false;

        // 蹩马脚
        if (Math.abs(to.x - from.x) === 2)
            return (
                situation.getBlocOfPieceAt(
                    new Point((from.x + to.x) / 2, from.y),
                ) === Bloc.SPACE
            );
        if (Math.abs(to.y - from.y) === 2)
            return (
                situation.getBlocOfPieceAt(
                    new Point(from.x, (from.y + to.y) / 2),
                ) === Bloc.SPACE
            );

        return true;
    }
}
