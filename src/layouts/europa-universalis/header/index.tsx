import type { JSX } from "preact";
import { Avatar } from "@/components/avatar";
import { MusicPlayer } from "@/components/music-player";
import { Navigator } from "@/components/navigator";
import { Status } from "@/components/status";
import style from "./index.module.scss";

type PropsType = Readonly<{
    onAvatarClick: JSX.MouseEventHandler<HTMLButtonElement>;
}>;

export function Header({ onAvatarClick }: PropsType) {
    return (
        <>
            <div class={style.left}>
                <button
                    type="button"
                    title="切换控制面板"
                    onClick={onAvatarClick}
                >
                    <Avatar />
                </button>
                <div>
                    <div>
                        <Status />
                    </div>
                    <div>
                        <Navigator />
                    </div>
                </div>
            </div>
            <div class={style.right}>
                <MusicPlayer />
            </div>
        </>
    );
}
