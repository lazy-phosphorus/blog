import type { Point } from "pixi.js";
import { Bloc, Piece } from "./piece";
import type { IMovable } from "./piece";

export class Pawn extends Piece implements IMovable {
    constructor(bloc: Bloc, blockSize: number) {
        super(bloc, bloc === Bloc.RED ? "兵" : "卒", blockSize);
    }

    public override movable(to: Point) {
        const from = this.position;

        if (this.bloc === Bloc.RED) {
            // 前进
            if (from.x === to.x && from.y === to.y + 1) return true;

            // 左右
            if (from.y <= 5 && from.y === to.y) {
                return Math.abs(to.x - from.x) === 1;
            }
        } else {
            // 前进
            if (from.x === to.x && from.y === to.y - 1) return true;

            // 左右
            if (from.y >= 6 && from.y === to.y) {
                return Math.abs(to.x - from.x) === 1;
            }
        }

        return false;
    }
}
