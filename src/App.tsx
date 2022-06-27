import type { Component } from "solid-js";
import IntroSection from "./sections/IntroSection";
import HomeCarousel from "./sections/homeCarousel";
import styles from "./App.module.scss";
import { onCleanup, onMount } from "solid-js";
import { setWh, setWw } from "./store/window";

const App: Component = () => {
  const onResize = () => {
    setWw(window.innerWidth);
    setWh(window.innerHeight);
  };
  onMount(() => {
    setTimeout(onResize);
    window.addEventListener("resize", onResize);
  });
  onCleanup(() => {
    window.removeEventListener("resize", onResize);
  });
  return (
    <div class={styles.App}>
      <div class={styles.section}>
        <IntroSection />
      </div>
      {/*<div class={styles.section} style={{ visibility: "hidden" }}>
        <HomeCarousel />
      </div>*/}
    </div>
  );
};

export default App;
