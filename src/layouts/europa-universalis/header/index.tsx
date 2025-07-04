import { Avatar } from "@/components/avatar";
import { MusicPlayer } from "@/components/music-player";
import { Navigator } from "@/components/navigator";
import { Status } from "@/components/status";
import style from "./index.module.scss";

export function Header() {
    return (
        <>
            <div class={style.pcleft}>
                <button type="button" title="切换控制面板">
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
            <div class={style.mbleft}></div>
            <div class={style.right}>
                <MusicPlayer />
            </div>
        </>
    );
}
