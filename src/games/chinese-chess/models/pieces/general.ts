import type { BitmapText, Container, Point, Sprite } from "pixi.js";
import { screenPoint2BoardPoint } from "../../utils/point-convert";
import { Piece } from "./piece";
import { Bloc, type IMovable } from "./piece";

export class General
    extends Piece
    implements Container<Sprite | BitmapText>, IMovable
{
    constructor(bloc: Bloc) {
        super(bloc, bloc === Bloc.RED ? "帥" : "將");
    }

    public override movable(_to: Point, blockSize: number): boolean {
        const from = screenPoint2BoardPoint(this.position, blockSize);
        const to = screenPoint2BoardPoint(_to, blockSize);

        // 仅能横或竖 1 格
        if (Math.abs(to.x - from.x) + Math.abs(to.y - from.y) !== 1)
            return false;

        // 不允许超出九宫
        if (to.x <= 3 || 7 <= to.x) return false;
        if (this.bloc === Bloc.RED) return to.y >= 8;
        else return to.y <= 3;
    }
}
