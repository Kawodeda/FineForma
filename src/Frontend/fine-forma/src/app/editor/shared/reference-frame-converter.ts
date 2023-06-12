import { Vector2, Viewport } from 'fine-forma-core';

export function canvasToDesignPoint(inCanvas: Vector2, viewport: Viewport): Vector2 {
    return viewport.transform.matrix.inverse().applyTo(inCanvas);
}

export function canvasToDesignSize(inCanvas: Vector2, viewport: Viewport): Vector2 {
    return inCanvas.scale(viewport.zoom);
}