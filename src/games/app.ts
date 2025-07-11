import { Application } from "pixi.js";

export function create(container: HTMLElement) {
    const app = new Application();

    app.init({
        resizeTo: container,
        antialias: true,
        autoDensity: true,
        preference: "webgpu",
        powerPreference: "high-performance",
        backgroundColor: 0x1099bb,
        resolution: devicePixelRatio,
    }).then(() => container.appendChild(app.canvas));

    return app;
}
