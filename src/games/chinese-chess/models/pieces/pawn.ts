import type { BitmapText, Container, Point, Sprite } from "pixi.js";
import { screenPoint2BoardPoint } from "../../utils/point-convert";
import { Piece } from "./piece";
import { Bloc, type IMovable } from "./piece";

export class Pawn
    extends Piece
    implements Container<Sprite | BitmapText>, IMovable
{
    public override movable(_to: Point, blockSize: number): boolean {
        const from = screenPoint2BoardPoint(this.position, blockSize);
        const to = screenPoint2BoardPoint(_to, blockSize);

        if (this.bloc === Bloc.RED) {
            // 前进
            if (from.x === to.x && from.y === to.y - 1) return true;

            // 左右
            if (from.x <= 5 && from.y === to.y) {
                return Math.abs(to.x - from.x) === 1;
            }
        } else {
            // 前进
            if (from.x === to.x && from.y === to.y + 1) return true;

            // 左右
            if (from.x >= 6 && from.y === to.y) {
                return Math.abs(to.x - from.x) === 1;
            }
        }

        return false;
    }
}
