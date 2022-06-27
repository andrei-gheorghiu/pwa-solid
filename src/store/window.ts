import { createSignal } from "solid-js";

export const [ww, setWw] = createSignal<number>(window.innerWidth);
export const [wh, setWh] = createSignal<number>(window.innerHeight);
export const [xPos, setXPos] = createSignal(ww() / 2);
export const [yPos, setYPos] = createSignal(wh() / 2);
