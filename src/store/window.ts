import { createSignal } from "solid-js";

const [wh, setWh] = createSignal<number>(800);
const [ww, setWw] = createSignal<number>(800);

export { wh, setWh, ww, setWw };
