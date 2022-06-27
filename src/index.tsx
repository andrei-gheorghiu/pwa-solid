/* @refresh reload */
import { render } from "solid-js/web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";
// @ts-ignore
import { DrawSVGPlugin } from "../public/assets/js/draw-svg-plugin";
import "tailwindcss/tailwind.css";
import "flickity/dist/flickity.min.css";
import "./index.css";
import App from "./App";
window.gsap = gsap;

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

render(() => <App />, document.getElementById("root") as HTMLElement);
