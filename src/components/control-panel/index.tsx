import type { JSX } from "preact";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { dispatchSuccessEvent } from "@/events/success";
import { Card } from "@/layouts/card";
import { isControlPanelVisible } from "@/signals/is-control-panel-visible";
import { IconClose } from "@svg/close";
import { readConfig, saveConfig } from "./config";
import type { ConfigType } from "./config";
import style from "./index.module.scss";

const colorItems: { key: keyof ConfigType; label: string }[] = [
    { key: "--color-primary", label: "主要主题（背景）" },
    { key: "--color-primary-content", label: "主题（前景）" },
    { key: "--color-secondary", label: "次要主题（背景）" },
    { key: "--color-secondary-content", label: "次要主题（前景）" },
    { key: "--color-accent", label: "高亮（背景）" },
    { key: "--color-accent-content", label: "高亮（前景）" },
    { key: "--color-base-100", label: "背景（深）" },
    { key: "--color-base-200", label: "背景（中）" },
    { key: "--color-base-300", label: "背景（浅）" },
    { key: "--color-base-content", label: "前景色" },
    { key: "--color-info", label: "通知：信息（背景）" },
    { key: "--color-info-content", label: "通知：信息（前景）" },
    { key: "--color-success", label: "通知：成功（背景）" },
    { key: "--color-success-content", label: "通知：成功（前景）" },
    { key: "--color-warning", label: "通知：警告（背景）" },
    { key: "--color-warning-content", label: "通知：警告（前景）" },
    { key: "--color-error", label: "通知：错误（背景）" },
    { key: "--color-error-content", label: "通知：错误（前景）" },
];

export function ControlPanel() {
    const config = useRef<Partial<ConfigType>>({});
    const formRef = useRef<HTMLFormElement | null>(null);

    const syncConfig = useCallback(() => {
        Object.keys(config.current).forEach((key) => {
            const value = config.current[key as keyof ConfigType]!;
            document.body.style.setProperty(key, value);
            const temp = formRef.current!.querySelector<HTMLInputElement>(
                `input[name=${key}]`,
            );
            if (temp !== null && key.startsWith("--color")) {
                temp.value = value;
                const button = temp.previousElementSibling as HTMLButtonElement;
                button.style.setProperty("--color", value);
            }
        });
    }, [config, formRef]);

    const handleClosePanel = useCallback(() => {
        isControlPanelVisible.value = false;
    }, []);

    useEffect(() => {
        config.current = readConfig();
        const styles = getComputedStyle(document.body);
        for (const item of colorItems) {
            if (config.current[item.key] === void 0)
                config.current[item.key] = styles.getPropertyValue(item.key);
        }

        syncConfig();
    }, [config, syncConfig]);

    const handlePickColor = useCallback<
        JSX.MouseEventHandler<HTMLButtonElement>
    >((event) => {
        const colorPicker = event.currentTarget
            .nextElementSibling as HTMLInputElement;
        colorPicker.click();
    }, []);

    const handleInput = useCallback<JSX.InputEventHandler<HTMLFormElement>>(
        (event) => {
            const element = event.target as HTMLInputElement;
            config.current[element.name as keyof ConfigType] = element.value;
            document.body.style.setProperty(element.name, element.value);
            const button = element.previousElementSibling as HTMLButtonElement;
            button.style.setProperty("--color", element.value);
        },
        [config],
    );

    const handleSaveConfig = useCallback<
        JSX.SubmitEventHandler<HTMLFormElement>
    >(
        (event) => {
            event.preventDefault();

            saveConfig(config.current);
            dispatchSuccessEvent("设置保存成功");
        },
        [config],
    );

    const handleReset = useCallback(() => {
        config.current = readConfig();
        syncConfig();
    }, [config, syncConfig]);

    const handleResetToDefault = useCallback(() => {
        const styles = getComputedStyle(document.querySelector(":root")!);
        for (const item of colorItems) {
            config.current[item.key] = styles.getPropertyValue(item.key);
        }

        syncConfig();
    }, [config, syncConfig]);

    return (
        <aside
            class={`${style.control}${isControlPanelVisible.value ? "" : ` ${style.hidden}`}`}
        >
            <button
                type="button"
                title="关闭控制面板"
                onClick={handleClosePanel}
            >
                <IconClose />
            </button>
            <Card class={style.card}>
                <h1>控制面板</h1>
                <form
                    ref={formRef}
                    name="config"
                    onInput={handleInput}
                    onSubmit={handleSaveConfig}
                    onReset={handleReset}
                >
                    <h2>颜色配置</h2>
                    <div class={style.colors}>
                        {colorItems.map(({ key, label }) => (
                            <div key={key}>
                                <label for={key}>{label}</label>
                                <button
                                    type="button"
                                    title="选取颜色"
                                    onClick={handlePickColor}
                                />
                                <input
                                    type="color"
                                    name={key}
                                    title={label}
                                    placeholder="请选择颜色"
                                />
                            </div>
                        ))}
                    </div>
                    <div class={style.buttons}>
                        <button type="submit" title="保存配置">
                            保存配置
                        </button>
                        <button type="reset" title="撤销更改">
                            撤销更改
                        </button>
                        <button
                            type="button"
                            title="恢复默认"
                            onClick={handleResetToDefault}
                        >
                            读取默认
                        </button>
                    </div>
                </form>
            </Card>
        </aside>
    );
}
