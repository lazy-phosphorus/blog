import { useComputed } from "@preact/signals";
import type { Signal } from "@preact/signals";
import type { JSX } from "preact";
import { useCallback } from "preact/hooks";
import { Link } from "@/components/link";
import { Switch } from "@/components/switch";
import { Card } from "@/layouts/card";
import { Drawer } from "@/layouts/drawer";
import { useSettings } from "../../hooks/use-settings";
import style from "./index.module.scss";

type PropsType = Readonly<{
    isOpen: Signal<boolean>;
}>;

export function SettingsForm({ isOpen }: PropsType) {
    const { isRedSide, isDeductiveMode, isAiEnabled, isAiTakeOverRed } =
        useSettings();

    const isRedSideLabel = useComputed(() =>
        isRedSide.value ? "红方视角" : "黑方视角",
    );
    const isRedSideTitle = useComputed(() =>
        isRedSide.value ? "切换至黑方视角" : "切换至红方视角",
    );
    const isDeductiveModeLabel = useComputed(() =>
        isDeductiveMode.value ? "推演模式" : "对弈模式",
    );
    const isDeductiveModeTitle = useComputed(() =>
        isDeductiveMode.value ? "切换至对方视角" : "切换至己方视角",
    );

    const isAiEnabledLabel = useComputed(() =>
        isAiEnabled.value ? "云库：已启用" : "云库：已禁用",
    );
    const isAiEnabledTitle = useComputed(() =>
        isAiEnabled.value ? "禁用云库" : "启用云库",
    );
    const isAiTakeOverRedLabel = useComputed(() =>
        isAiTakeOverRed.value ? "云库执红" : "云库执黑",
    );
    const isAiTakeOverRedTitle = useComputed(() =>
        isAiTakeOverRed.value ? "让云库执黑" : "让云库执红",
    );

    const handleChangeSide = useCallback(() => {
        isRedSide.value = !isRedSide.peek();
    }, [isRedSide]);

    const handleChangeMode = useCallback(() => {
        isDeductiveMode.value = !isDeductiveMode.peek();
    }, [isDeductiveMode]);

    const handleChangeAi = useCallback(() => {
        isAiEnabled.value = !isAiEnabled.peek();
    }, [isAiEnabled]);

    const handleChangeAiSide = useCallback(() => {
        isAiTakeOverRed.value = !isAiTakeOverRed.peek();
    }, [isAiTakeOverRed]);

    const handleSaveSettings = useCallback<
        JSX.SubmitEventHandler<HTMLFormElement>
    >((event) => {
        event.preventDefault();
        const temp = new FormData(event.currentTarget);
        for (const [k, v] of temp) {
            console.log(114514, k, v);
        }
    }, []);

    const handleCloseSettings = useCallback(
        () => (isOpen.value = false),
        [isOpen],
    );

    return (
        <Drawer class={style.drawer} isOpen={isOpen} position="right">
            <Card class={style.card}>
                <h1>游戏设置</h1>
                <form name="chess-setting" onSubmit={handleSaveSettings}>
                    <div>
                        <label for="isRedSide">{isRedSideLabel}</label>
                        <Switch
                            name="isRedSide"
                            title={isRedSideTitle}
                            placeholder="视角设置"
                            checked={isRedSide}
                            onInput={handleChangeSide}
                        />
                    </div>
                    <div>
                        <label for="isDeductiveMode">
                            {isDeductiveModeLabel}
                        </label>
                        <Switch
                            name="isDeductiveMode"
                            title={isDeductiveModeTitle}
                            placeholder="棋子朝向设置"
                            checked={isDeductiveMode}
                            onInput={handleChangeMode}
                        />
                    </div>
                    <div>
                        <label for="isAiEnabled">{isAiEnabledLabel}</label>
                        <Switch
                            name="isAiEnabled"
                            title={isAiEnabledTitle}
                            placeholder="云库设置"
                            checked={isAiEnabled}
                            onInput={handleChangeAi}
                        />
                    </div>
                    {isAiEnabled.value ? (
                        <>
                            <p>
                                该服务由
                                <Link
                                    href="https://www.chessdb.cn/query/"
                                    title="点击跳转"
                                >
                                    中国象棋云库
                                </Link>
                                提供
                            </p>
                            <div>
                                <label for="isAiTakeOverRed">
                                    {isAiTakeOverRedLabel}
                                </label>
                                <Switch
                                    name="isAiTakeOverRed"
                                    title={isAiTakeOverRedTitle}
                                    placeholder="云库接管设置"
                                    checked={isAiTakeOverRed}
                                    onInput={handleChangeAiSide}
                                />
                            </div>
                        </>
                    ) : (
                        void 0
                    )}
                    <div class={style.buttons}>
                        <button
                            type="button"
                            title="取消设置"
                            onClick={handleCloseSettings}
                        >
                            关闭
                        </button>
                    </div>
                </form>
            </Card>
        </Drawer>
    );
}
