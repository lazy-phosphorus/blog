import { useCallback, useEffect, useRef } from "preact/hooks";
import { PlaceHolder } from "@/components/placeholder";
import { create } from "../app";
import style from "./index.module.scss";
import { Board } from "./models/board";

function calcBlockSize(width: number, height: number) {
    return Math.min(width / 9, height / 10);
}

export function ChineseChess() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const boardRef = useRef<Board | null>(null);

    const handleResize = useCallback(() => {
        const chess = containerRef.current!.parentElement as HTMLDivElement;

        const blockSize = calcBlockSize(chess.offsetWidth, chess.offsetHeight);
        containerRef.current!.style.width = `${blockSize * 9}px`;
        containerRef.current!.style.height = `${blockSize * 10}px`;

        boardRef.current!.blockSize = blockSize;
    }, [containerRef]);

    useEffect(() => {
        const game = create(containerRef.current!);
        const chess = containerRef.current!.parentElement as HTMLDivElement;
        boardRef.current = new Board(
            calcBlockSize(chess.offsetWidth, chess.offsetHeight),
            game.stage,
        );

        handleResize();
        addEventListener("resize", handleResize);

        containerRef.current!.classList.add(style.ready!);

        return () => {
            game.destroy();
            removeEventListener("resize", handleResize);
        };
    }, [containerRef, boardRef, handleResize]);

    const handleRegret = useCallback(() => {
        boardRef.current!.regret();
    }, [boardRef]);

    const handleReset = useCallback(() => {
        boardRef.current!.reset();
    }, [boardRef]);

    return (
        <div class={style.chess}>
            <PlaceHolder class={style.placeholder} />
            <div class={style.game} ref={containerRef} />
            <div class={style.buttons}>
                <button type="button" title="悔棋" onClick={handleRegret}>
                    悔棋
                </button>
                <button type="button" title="重置" onClick={handleReset}>
                    重置
                </button>
            </div>
        </div>
    );
}
