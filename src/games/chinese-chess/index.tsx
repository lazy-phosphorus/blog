import { effect, useSignal } from "@preact/signals";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { PlaceHolder } from "@/components/placeholder";
import { create } from "../app";
import { SettingsForm } from "./components/settings-form";
import { useSettings } from "./hooks/use-settings";
import style from "./index.module.scss";
import { Board } from "./models/board";
import { Bloc } from "./models/pieces/piece";

function calcBlockSize(width: number, height: number) {
    return Math.min(width / 10, height / 10);
}

export function ChineseChess() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const boardRef = useRef<Board | null>(null);

    const { isRedSide, isDeductiveMode, isAiEnabled, isAiTakeOverRed } =
        useSettings();
    const isSettingsOpen = useSignal(false);

    const handleResize = useCallback(() => {
        const chess = containerRef.current!.parentElement as HTMLDivElement;
        const blockSize = calcBlockSize(chess.offsetWidth, chess.offsetHeight);
        chess.style.fontSize = `${blockSize / 4}px`;
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

        effect(() => {
            boardRef.current!.isRedSide = isRedSide.value;
        });
        effect(() => {
            boardRef.current!.isDeductive = isDeductiveMode.value;
        });
        effect(() => {
            boardRef.current!.aiTakeOver = isAiEnabled.value
                ? isAiTakeOverRed.value
                    ? Bloc.RED
                    : Bloc.BLACK
                : null;
        });

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

    const handleOpenSettings = useCallback(
        () => (isSettingsOpen.value = true),
        [isSettingsOpen],
    );

    return (
        <div class={style.chess}>
            <PlaceHolder class={style.placeholder} />
            <div class={style.game} ref={containerRef}>
                <div>
                    <button type="button" title="悔棋" onClick={handleRegret}>
                        悔棋
                    </button>
                    <button type="button" title="重置" onClick={handleReset}>
                        重置
                    </button>
                    <button
                        type="button"
                        title="设置"
                        onClick={handleOpenSettings}
                    >
                        设置
                    </button>
                </div>
            </div>
            <SettingsForm isOpen={isSettingsOpen} />
        </div>
    );
}
