import { Point } from "pixi.js";
import type { Situation } from "../situation";
import { Bloc, Piece } from "./piece";
import type { IMovable } from "./piece";

export class Bishop extends Piece implements IMovable {
    constructor(bloc: Bloc, blockSize: number) {
        super(bloc, bloc === Bloc.RED ? "相" : "象", blockSize);
    }

    public override movable(to: Point, situation: Situation) {
        const from = this.position;

        // 田字行棋
        if (Math.abs(to.x - from.x) !== 2 || Math.abs(to.y - from.y) !== 2)
            return false;

        // 卡象眼
        const weakPoint = new Point((from.x + to.x) / 2, (from.y + to.y) / 2);
        if (situation.getBlocOfPieceAt(weakPoint) !== Bloc.SPACE) return false;

        // 不允许过河
        if (this.bloc === Bloc.RED) return to.y >= 6;
        else return to.y <= 5;
    }
}
