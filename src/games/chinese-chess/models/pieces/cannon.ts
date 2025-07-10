import { type BitmapText, type Container, Point, type Sprite } from "pixi.js";
import { screenPoint2BoardPoint } from "../../utils/point-convert";
import type { Situation } from "../situation";
import { Piece } from "./piece";
import { Bloc, type IMovable } from "./piece";

export class Cannon
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

        // 不允许斜向行棋
        if (from.x !== to.x && from.y !== to.y) return false;

        let hasPiece = false;
        if (from.x !== to.x) {
            // 横向行棋
            for (
                let i = Math.min(from.x, to.x) + 1;
                i < Math.max(from.x, to.x);
                i++
            ) {
                if (
                    situation.getBlocOfPieceAt(new Point(i, from.y)) !==
                    Bloc.SPACE
                ) {
                    // 不允许隔着两个炮架
                    if (hasPiece === true) return false;
                    hasPiece = true;
                }
            }
        } else {
            // 纵向行棋
            for (
                let i = Math.min(from.y, to.y) + 1;
                i < Math.max(from.y, to.y);
                i++
            ) {
                if (
                    situation.getBlocOfPieceAt(new Point(from.x, i)) !==
                    Bloc.SPACE
                ) {
                    // 不允许隔着两个炮架
                    if (hasPiece === true) return false;
                    hasPiece = true;
                }
            }
        }

        return true;
    }
}
