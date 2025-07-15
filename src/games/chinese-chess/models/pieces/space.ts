import { Bloc, Piece } from "./piece";
import type { IMovable } from "./piece";

export class Space extends Piece implements IMovable {
    constructor(blockSize: number) {
        super(Bloc.SPACE, "", blockSize);
    }

    public override movable() {
        return false;
    }
}
