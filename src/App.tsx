import type { Component } from "solid-js";
import PaulWoods from "./sections/paulWoods";
import HomeCarousel from "./sections/homeCarousel";
import styles from "./App.module.scss";
import { wh, ww } from "./store/window";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <div
        class={styles.intro}
        style={{ "--scrollHeight": `${Math.max(1.5 * ww(), 3 * wh())}px` }}
      >
        <section class={styles.section}>
          <PaulWoods />
        </section>
      </div>
      <div class="w-max-full overflow-hidden flex">
        <section class={[styles.section, "carousel-wrapper"].join(" ")}>
          <HomeCarousel />
        </section>
      </div>
    </div>
  );
};

export default App;
