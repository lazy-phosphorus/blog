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

        // TODO 不允许过河

        return true;
    }
}
