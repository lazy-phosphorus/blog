import { type BitmapText, type Container, Point, type Sprite } from "pixi.js";
import { screenPoint2BoardPoint } from "../../utils/point-convert";
import type { Situation } from "../situation";
import { Piece } from "./piece";
import { Bloc, type IMovable } from "./piece";

export class Knight
    extends Piece
    implements Container<Sprite | BitmapText>, IMovable
{
    public override movable(
        _to: Point,
        blockSize: number,
        situation: Situation,
    ): boolean {
        const from = screenPoint2BoardPoint(this.position, blockSize);
        const to = screenPoint2BoardPoint(_to, blockSize);

        // 不允许直线行棋
        if (from.x === to.x || from.y === to.y) return false;

        // 日字行棋
        if (Math.abs(to.x - from.x) + Math.abs(to.y - from.y) !== 3)
            return false;

        // 蹩马脚
        if (Math.abs(to.x - from.x) === 2)
            return (
                situation.getBlocOfPieceAt(
                    new Point((from.x + to.x) / 2, from.y),
                ) !== Bloc.SPACE
            );
        if (Math.abs(to.y - from.y) === 2)
            return (
                situation.getBlocOfPieceAt(
                    new Point(from.x, (from.y + to.y) / 2),
                ) !== Bloc.SPACE
            );

        return true;
    }
}
