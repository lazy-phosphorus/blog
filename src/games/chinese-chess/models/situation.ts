import type { Container, Point } from "pixi.js";
import { Bloc, type Piece } from "./pieces/piece";
import { Rook } from "./pieces/rook";

export class Situation {
    private readonly battleField: Piece[][] = [];
    constructor() {
        this.initialize();
    }

    public getBlocOfPieceAt(point: Point) {
        return this.battleField[point.x]![point.y]!.bloc;
    }

    public addToStage(stage: Container) {
        for (const line of this.battleField) {
            for (const piece of line) {
                stage.addChild(piece);
            }
        }
    }

    public resize(blockSize: number) {
        for (const line of this.battleField) {
            for (const piece of line) {
                piece.setSize(blockSize, blockSize);
            }
        }
    }

    private initialize() {
        this.battleField.push([new Rook(Bloc.BLACK)]);
    }
}
