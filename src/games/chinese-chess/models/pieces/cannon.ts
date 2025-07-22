import { Point } from "pixi.js";
import type { Situation } from "../situation";
import { Bloc, Piece } from "./piece";
import type { IMovable } from "./piece";

export class Cannon extends Piece implements IMovable {
    protected override readonly __code;

    constructor(bloc: Bloc, blockSize: number) {
        super(bloc, "炮", blockSize);
        this.__code = bloc === Bloc.RED ? "C" : "c";
    }

    public override movable(to: Point, situation: Situation) {
        const from = this.position;

        // 不允许斜向行棋
        if (from.x !== to.x && from.y !== to.y) return false;

        let hasPiece = false;
        if (from.x !== to.x) {
            // 横向行棋
            for (
                let i = Math.min(from.x, to.x) + 1;
                i < Math.max(from.x, to.x);
                i++
            ) {
                if (
                    situation.getBlocOfPieceAt(new Point(i, from.y)) !==
                    Bloc.SPACE
                ) {
                    // 不允许隔着两个炮架
                    if (hasPiece === true) return false;
                    hasPiece = true;
                }
            }
        } else {
            // 纵向行棋
            for (
                let i = Math.min(from.y, to.y) + 1;
                i < Math.max(from.y, to.y);
                i++
            ) {
                if (
                    situation.getBlocOfPieceAt(new Point(from.x, i)) !==
                    Bloc.SPACE
                ) {
                    // 不允许隔着两个炮架
                    if (hasPiece === true) return false;
                    hasPiece = true;
                }
            }
        }

        // 若有阻挡，则必须击发；若无阻挡，则不允许击发
        return hasPiece === (situation.getBlocOfPieceAt(to) !== Bloc.SPACE);
    }
}
