import { useCallback, useEffect, useRef } from "preact/hooks";
import { create } from "../app";
import style from "./index.module.scss";
import { Board } from "./models/board";

export function ChineseChess() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const boardRef = useRef<Board | null>(null);

    const handleResize = useCallback(() => {
        const chess = containerRef.current!.parentElement as HTMLDivElement;

        const blockSize = Math.min(
            chess.offsetWidth / 9,
            chess.offsetHeight / 10,
        );
        containerRef.current!.style.width = `${blockSize * 9}px`;
        containerRef.current!.style.height = `${blockSize * 10}px`;

        boardRef.current!.resize(blockSize);
    }, [containerRef]);

    useEffect(() => {
        boardRef.current = new Board();
        const game = create(containerRef.current!);
        game.stage.addChild(boardRef.current!);

        handleResize();
        addEventListener("resize", handleResize);

        return () => {
            game.destroy();
            removeEventListener("resize", handleResize);
        };
    }, [containerRef]);

    return (
        <div class={style.chess}>
            <div ref={containerRef} />
        </div>
    );
}
