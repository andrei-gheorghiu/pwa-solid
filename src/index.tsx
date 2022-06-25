/* @refresh reload */
import { render } from "solid-js/web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "tailwindcss/tailwind.css";
import "flickity/dist/flickity.min.css";
import "./index.css";
import App from "./App";

gsap.registerPlugin(ScrollTrigger);

render(() => <App />, document.getElementById("root") as HTMLElement);
