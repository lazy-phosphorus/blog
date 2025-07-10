import type { BitmapText, Container, Sprite } from "pixi.js";
import { Bloc, Piece } from "./piece";
import type { IMovable } from "./piece";

export class Space
    extends Piece
    implements Container<Sprite | BitmapText>, IMovable
{
    constructor() {
        super(Bloc.SPACE, "", { alpha: 0 });
    }

    public override movable(): boolean {
        return false;
    }
}
