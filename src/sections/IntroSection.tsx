import type { Component } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer"
// import { SplitText } from "gsap/SplitText";
import { createSignal, For, onCleanup, onMount } from "solid-js";
import styles from "./Intro.module.scss";

interface Step {
  title: string;
  image: string;
}

const IntroSection: Component = () => {
  let wrapper: HTMLDivElement | undefined;
  const steps: Step[] = [
    { title: "", image: "" },
    {
      title: "woods",
      image: "Paul-Woods-Hibernia-110-x140cm-oil-on-canvas-2016.jpeg",
    },
    {
      title: "art",
      image:
        "Paul-Woods-The-Somme-on-the-Liffey-200x140cm-oil-on-canvas-2016.jpeg",
    },
    {
      title: "paul",
      image: "Paul-Woods-The-Theatre-150x100cm-oil-on-canvas-2015.jpeg",
    },
    {
      title: ".com",
      image: "Paul_Woods-For-our-Future_oil-on-canvas_2016.jpeg",
    },
    { title: "", image: "" },
  ];
  const { wrap, toArray } = gsap.utils;
  const { timeline, set } = gsap;
  const [isAnimating, setIsAnimating] = createSignal(false);
  const [done, setDone] = createSignal(false);
  const [currentIndex, setCurrentIndex] = createSignal(-1);
  let outerWrappers: HTMLDivElement[] = [];
  let innerWrappers: HTMLDivElement[] = [];
  let sections: HTMLElement[] = [];
  let images: HTMLImageElement[] = [];
  let observer: Observer | undefined;
  onMount(() => {
    outerWrappers = toArray(".outer", wrapper);
    innerWrappers = toArray(".inner", wrapper);
    sections = toArray("section", wrapper);
    images = toArray(".bg", wrapper);
    outerWrappers.forEach((outer, i) => {
      set(outer, { yPercent: 100 });
      set(innerWrappers[i], { yPercent: -100 });
    });
    goToStep(0, 1);
    observer = ScrollTrigger.observe({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => {
        !isAnimating() && goToStep(currentIndex() - 1, -1);
      },
      onUp: () => {
        !isAnimating() && goToStep(currentIndex() + 1, 1);
      },
    });
  });
  onCleanup(() => {
    observer?.kill();
  });

  const getBackground = (step: Step) => ({
    "background-image": `url('assets/gallery/${step.image}')`,
    "background-color": "#191919",
  });

  const goToStep = (index: number, direction: number) => {
    if (index >= steps.length) {
      return;
    }
    console.log({ index, direction });
    if (direction === -1) {
      setDone(false);
      if (!index) {
        console.log(index, "here", 0);
        index = steps.length - 1;
        console.log(index, "here", 1);
      }
    }
    index = wrap(0, steps.length)(index);
    setIsAnimating(true);
    let dFactor = direction === -1 ? -1 : 1;
    let tl = timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => {
        setIsAnimating(false);
        if (direction === 1) {
          setCurrentIndex(index);
          setDone(index === steps.length - 1);
        }
      },
    });
    if (currentIndex() > -1) {
      set(sections[currentIndex()], { zIndex: 0 });
      tl.to(images[currentIndex()], {
        yPercent: -15 * dFactor,
      }).set(sections[currentIndex()], { autoAlpha: 0 });
    }
    set(sections[index], { autoAlpha: 1, zIndex: 1 });
    if (direction === -1) {
      setTimeout(
        () => {
          setCurrentIndex(index);
        },
        index === steps.length - 1 ? 1e3 : 0
      );
    }
    tl.fromTo(
      [outerWrappers[index], innerWrappers[index]],
      {
        yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor),
      },
      { yPercent: 0 },
      0
    ).fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);
  };

  return (
    <div ref={wrapper} class={styles.Intro}>
      <div class="absolute z-10 text-white">
        {JSON.stringify({ index: currentIndex(), done: done() }, null, 2)}
      </div>
      <For each={steps}>
        {(step) => (
          <section>
            <div class="outer">
              <div class="inner">
                <div class="bg">
                  <div style={getBackground(step)} />
                </div>
                <div class="title-grid">
                  {step.title && (
                    <h2
                      class={["title", step.title.replace(".", "")].join(" ")}
                    >
                      {step.title}
                    </h2>
                  )}
                  {!step.title && (
                    <>
                      {steps.map(({ title }, index) => (
                        <h2
                          class={[
                            title.replace(".", ""),
                            index < 3 ? "" : "dimmed",
                            "title",
                          ].join(" ")}
                        >
                          {title}
                        </h2>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </For>
      <div class="fixed h-full w-full top-0 title-grid z-[2]">
        {steps.map(({ title }, index) => (
          <h2
            class={[
              title.replace(".", ""),
              index > currentIndex() || done()
                ? "text-transparent"
                : currentIndex() === steps.length - 1
                ? index < 3
                  ? ""
                  : "dimmed"
                : "dimmed",
            ].join(" ")}
          >
            {title}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default IntroSection;
