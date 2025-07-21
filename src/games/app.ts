import { Application } from "pixi.js";

export function create(container: HTMLElement) {
    const app = new Application();

    app.init({
        resizeTo: container,
        antialias: true,
        autoDensity: true,
        preference: "webgl",
        powerPreference: "high-performance",
        backgroundAlpha: 0,
        resolution: devicePixelRatio,
    }).then(() => container.appendChild(app.canvas));

    return app;
}
