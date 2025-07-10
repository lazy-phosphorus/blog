import type { Point } from "pixi.js";
import type { Piece } from "./pieces/piece";

export class Situation {
    private readonly board: Piece[][] = [];
    constructor() {
        this.initialize();
    }

    public getBlocOfPieceAt(point: Point) {
        return this.board[point.x]![point.y]!.bloc;
    }

    private initialize() {
        // TODO 初始化
        this.board.push();
    }
}
