import { Point } from "pixi.js";
import type { BitmapText, Container, Sprite } from "pixi.js";
import { screenPoint2BoardPoint } from "../../utils/point-convert";
import type { Situation } from "../situation";
import { Bloc, Piece } from "./piece";
import type { IMovable } from "./piece";

export class Bishop
    extends Piece
    implements Container<Sprite | BitmapText>, IMovable
{
    constructor(bloc: Bloc) {
        super(bloc, bloc === Bloc.RED ? "相" : "象");
    }

    public override movable(
        _to: Point,
        blockSize: number,
        situation: Situation,
    ) {
        const from = screenPoint2BoardPoint(this.position, blockSize);
        const to = screenPoint2BoardPoint(_to, blockSize);

        // 田字行棋
        if (Math.abs(to.x - from.x) !== 2 || Math.abs(to.y - from.y) !== 2)
            return false;

        // 卡象眼
        const weakPoint = new Point((from.x + to.x) / 2, (from.y + to.y) / 2);
        if (situation.getBlocOfPieceAt(weakPoint) !== Bloc.SPACE) return false;

        // 不允许过河
        if (this.bloc === Bloc.RED) return from.x >= 6;
        else return from.y <= 5;
    }
}
