import { Avatar } from "@/components/avatar";
import { MusicPlayer } from "@/components/music-player";
import { Navigator } from "@/components/navigator";
import { Status } from "@/components/status";
import style from "./index.module.scss";

export function Header() {
    return (
        <>
            <div class={style.pcleft}>
                <Avatar />
                <div class={style.info}>
                    <div>
                        <Status />
                    </div>
                    <div>
                        <Navigator />
                    </div>
                </div>
            </div>
            <div class={style.mbleft}></div>
            <div class={style.right}>
                <MusicPlayer />
            </div>
        </>
    );
}
