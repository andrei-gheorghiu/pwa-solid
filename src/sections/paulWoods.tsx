import type { Component } from "solid-js";
import gsap from "gsap";
import { For, onMount } from "solid-js";
import styles from "../App.module.scss";
import { ww, wh, setWw, setWh } from "../store/window";
const PaulWoods: Component = () => {
  const words = ["paul", "woods", "art", ".com"];
  const updateWSize = () => {
    setWw(window.innerWidth);
    setWh(window.innerHeight);
  };
  onMount(() => {
    updateWSize();
    window.onresize = updateWSize;
    gsap.to(`.${styles.section}`, {
      scrollTrigger: {
        pin: `.${styles.App}`,
        pinSpacing: false,
      },
    });
    gsap.utils.toArray(".word").forEach((word, wi) => {
      gsap.utils
        .toArray((word as HTMLElement).querySelectorAll(".letter"))
        .forEach((letter, li) => {
          gsap.fromTo(
            letter as HTMLElement,
            {
              x: wi % 2 ? ww() : -ww(),
              opacity: 0,
            },
            {
              scrollTrigger: {
                start: `top top-=${
                  (wi % 2 ? li : words[wi].length - li - 1) * (wh() / 3) +
                  wi * (wh() / 2.5)
                }`,
                end: `+=${wh() * 0.65}`,
                scrub: 2.1,
                pinSpacing: false,
              },
              opacity: 1,
              x: 0,
            }
          );
        });
    });
  });
  return (
    <div class="paul-woods">
      <For each={words}>
        {(word) => (
          <div class={`${word.replace(".", " ")} word`}>
            <For each={word.split("")}>
              {(letter) => <div class="letter">{letter}</div>}
            </For>
          </div>
        )}
      </For>
    </div>
  );
};

export default PaulWoods;
