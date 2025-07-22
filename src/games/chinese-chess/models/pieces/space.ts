import { Bloc, Piece } from "./piece";
import type { IMovable } from "./piece";

export class Space extends Piece implements IMovable {
    protected override readonly __code;

    constructor(blockSize: number) {
        super(Bloc.SPACE, "", blockSize);
        this.__code = "";
    }

    public override movable() {
        return false;
    }
}
