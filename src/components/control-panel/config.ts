const key = "config";

export type ConfigType = {
    "--color-primary": string;
    "--color-primary-content": string;
    "--color-secondary": string;
    "--color-secondary-content": string;
    "--color-accent": string;
    "--color-accent-content": string;
    "--color-base-100": string;
    "--color-base-200": string;
    "--color-base-300": string;
    "--color-base-content": string;
    "--color-info": string;
    "--color-info-content": string;
    "--color-success": string;
    "--color-success-content": string;
    "--color-warning": string;
    "--color-warning-content": string;
    "--color-error": string;
    "--color-error-content": string;
};

export function readConfig() {
    const temp = localStorage.getItem(key);

    if (temp === null) return {};

    return JSON.parse(temp) as Partial<ConfigType>;
}

export function saveConfig(config: Partial<ConfigType>) {
    let oldConfig = readConfig();
    oldConfig = oldConfig === null ? {} : oldConfig;
    localStorage.setItem(key, JSON.stringify({ ...oldConfig, ...config }));
}
