import type { Component } from "solid-js";
import IntroSection from "./sections/IntroSection";
import HomeCarousel from "./sections/homeCarousel";
import styles from "./App.module.scss";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <div class={styles.section}>
        <IntroSection />
      </div>
      <div class={styles.section}>
        <HomeCarousel />
      </div>
    </div>
  );
};

export default App;
