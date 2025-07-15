import { Point } from "pixi.js";
import type { Container } from "pixi.js";
import { Bishop } from "./pieces/bishop";
import { Cannon } from "./pieces/cannon";
import { General } from "./pieces/general";
import { Guard } from "./pieces/guard";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Bloc } from "./pieces/piece";
import type { Piece } from "./pieces/piece";
import { Rook } from "./pieces/rook";
import { Space } from "./pieces/space";

export class Situation {
    private readonly __battleField: Piece[][] = [];
    constructor(
        private __blockSize: number,
        private readonly __stage: Container,
        private readonly __clickHandler: (event: Piece) => void,
    ) {
        this.__initialize();
    }

    public set blockSize(blockSize: number) {
        for (const line of this.__battleField) {
            for (const piece of line) {
                piece.blockSize = blockSize;
            }
        }
        this.__blockSize = blockSize;
    }

    public getBlocOfPieceAt({ x, y }: Point) {
        return this.__battleField[y - 1]![x - 1]!.bloc;
    }

    public syncBattleField(from: Point, to: Point): Piece | null {
        const temp = this.__battleField[to.y - 1]![to.x - 1]!;
        this.__battleField[to.y - 1]![to.x - 1] =
            this.__battleField[from.y - 1]![from.x - 1]!;

        if (temp.bloc !== Bloc.SPACE) {
            const space = new Space(this.__blockSize);
            space.position = from;
            space.onClick(this.__clickHandler);
            space.addToStage(this.__stage);
            this.__battleField[from.y - 1]![from.x - 1] = space;
            temp.removeFromStage();
            return temp;
        } else {
            this.__battleField[from.y - 1]![from.x - 1] = temp;
            temp.position = from;
            return null;
        }
    }

    public traceBack(from: Point, to: Point, removed: Piece | null) {
        const temp = this.__battleField[from.y - 1]![from.x - 1]!;
        this.__battleField[from.y - 1]![from.x - 1] =
            this.__battleField[to.y - 1]![to.x - 1]!;

        this.__battleField[from.y - 1]![from.x - 1]!.position = from;

        if (removed !== null) {
            temp.removeFromStage();
            removed.position = to;
            this.__battleField[to.y - 1]![to.x - 1] = removed;
            removed.addToStage(this.__stage);
        } else {
            temp.position = to;
            this.__battleField[to.y - 1]![to.x - 1] = temp;
        }
    }

    public reset() {
        while (this.__battleField.length > 0) {
            const line = this.__battleField.pop()!;
            while (line.length > 0) {
                const temp = line.pop()!;
                temp.removeFromStage();
            }
        }

        this.__initialize();
    }

    private __initialize() {
        this.__battleField.push(
            [
                new Rook(Bloc.BLACK, this.__blockSize),
                new Knight(Bloc.BLACK, this.__blockSize),
                new Bishop(Bloc.BLACK, this.__blockSize),
                new Guard(Bloc.BLACK, this.__blockSize),
                new General(Bloc.BLACK, this.__blockSize),
                new Guard(Bloc.BLACK, this.__blockSize),
                new Bishop(Bloc.BLACK, this.__blockSize),
                new Knight(Bloc.BLACK, this.__blockSize),
                new Rook(Bloc.BLACK, this.__blockSize),
            ],
            [
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
            ],
            [
                new Space(this.__blockSize),
                new Cannon(Bloc.BLACK, this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Cannon(Bloc.BLACK, this.__blockSize),
                new Space(this.__blockSize),
            ],
            [
                new Pawn(Bloc.BLACK, this.__blockSize),
                new Space(this.__blockSize),
                new Pawn(Bloc.BLACK, this.__blockSize),
                new Space(this.__blockSize),
                new Pawn(Bloc.BLACK, this.__blockSize),
                new Space(this.__blockSize),
                new Pawn(Bloc.BLACK, this.__blockSize),
                new Space(this.__blockSize),
                new Pawn(Bloc.BLACK, this.__blockSize),
            ],
            [
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
            ],
            [
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
            ],
            [
                new Pawn(Bloc.RED, this.__blockSize),
                new Space(this.__blockSize),
                new Pawn(Bloc.RED, this.__blockSize),
                new Space(this.__blockSize),
                new Pawn(Bloc.RED, this.__blockSize),
                new Space(this.__blockSize),
                new Pawn(Bloc.RED, this.__blockSize),
                new Space(this.__blockSize),
                new Pawn(Bloc.RED, this.__blockSize),
            ],
            [
                new Space(this.__blockSize),
                new Cannon(Bloc.RED, this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Cannon(Bloc.RED, this.__blockSize),
                new Space(this.__blockSize),
            ],
            [
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
                new Space(this.__blockSize),
            ],
            [
                new Rook(Bloc.RED, this.__blockSize),
                new Knight(Bloc.RED, this.__blockSize),
                new Bishop(Bloc.RED, this.__blockSize),
                new Guard(Bloc.RED, this.__blockSize),
                new General(Bloc.RED, this.__blockSize),
                new Guard(Bloc.RED, this.__blockSize),
                new Bishop(Bloc.RED, this.__blockSize),
                new Knight(Bloc.RED, this.__blockSize),
                new Rook(Bloc.RED, this.__blockSize),
            ],
        );

        for (let i = 0; i < this.__battleField.length; i++) {
            for (let j = 0; j < this.__battleField[i]!.length; j++) {
                this.__battleField[i]![j]!.position = new Point(j + 1, i + 1);
                this.__battleField[i]![j]!.onClick(this.__clickHandler);
            }
        }

        for (let i = 0; i < this.__battleField.length; i++) {
            for (let j = 0; j < this.__battleField[i]!.length; j++) {
                this.__battleField[i]![j]!.addToStage(this.__stage);
            }
        }
    }
}
