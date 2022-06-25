import type { Component } from "solid-js";
import PaulWoods from "./sections/paulWoods";

import styles from "./App.module.scss";
import { wh, ww } from "./store/window";

const App: Component = () => {
  /*onMount(() => {
    gsap.to(`.${styles.logo}`, {
      scrollTrigger: {
        scrub: 1.2,
        pin: `.${styles.App}`,
        pinSpacing: false
      },
      rotation: 360 * 1.125
    })
  })*/
  return (
    <div class={styles.App}>
      <div style={{ "--scrollHeight": `${Math.max(2 * ww(), 4 * wh())}px` }}>
        <section class={styles.section}>
          <PaulWoods />
        </section>
      </div>
    </div>
  );
};

export default App;
