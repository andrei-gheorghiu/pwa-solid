import type { Component } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { createSignal, For, onCleanup, onMount } from "solid-js";
import styles from "./Intro.module.scss";
import { wh, ww } from "../store/window";

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
  const [xPos, setXPos] = createSignal(ww() / 2);
  const [yPos, setYPos] = createSignal(wh() / 2);
  let outerWrappers: HTMLDivElement[] = [];
  let innerWrappers: HTMLDivElement[] = [];
  let sections: HTMLElement[] = [];
  let images: HTMLImageElement[] = [];
  let observers: Observer[] = [];
  const onMouseMove = (e: any) => {
    const { x, y } = e;
    setXPos(x);
    setYPos(y);
  };
  const maskImage = () =>
    `circle 810px at ${xPos()}px ${yPos()}px, transparent 50%, white 50%`;
  onMount(() => {
    outerWrappers = toArray(".outer", wrapper);
    innerWrappers = toArray([".inner"], wrapper);
    sections = toArray("section", wrapper);
    images = toArray(".bg", wrapper);
    outerWrappers.forEach((outer, i) => {
      set(outer, { yPercent: 100 });
      set(innerWrappers[i], { yPercent: -100 });
    });
    goToStep(0, 1);
    observers.push(
      ScrollTrigger.observe({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onDown: () => {
          !isAnimating() && goToStep(currentIndex() - 1, -1);
        },
        onUp: () => {
          !isAnimating() && goToStep(currentIndex() + 1, 1);
        },
      }),
      ScrollTrigger.observe({
        type: "pointer,touch",
        onMove: onMouseMove,
      })
    );
  });
  onCleanup(() => {
    observers.forEach((obs) => obs.kill());
  });

  const getBackground = (step: Step) => ({
    "background-image": step.image
      ? `url('assets/gallery/${step.image}')`
      : `radial-gradient(circle 810px at ${xPos()}px calc(${yPos()}px + var(--y-percent)), transparent 50%, rgba(255,255,255,.05) 50%)`,
    "background-color": "#191919",
  });

  const getTitleClass = (title: string) =>
    ["title", title.replace(".", "")].join(" ");

  const goToStep = (index: number, direction: number) => {
    // if (index >= steps.length) {
    //   return;
    // }
    if (direction === -1) {
      setDone(false);
      if (!index) {
        index = steps.length - 1;
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
      })
        .to(
          sections[currentIndex()],
          {
            "--y-percent": -15 * dFactor + "vh",
          },
          0
        )
        .set(sections[currentIndex()], { autoAlpha: 0 });
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
    )
      .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
      .fromTo(
        sections[index],
        {
          "--y-percent": -15 * dFactor + "vh",
        },
        {
          "--y-percent": 0 + "vh",
        },
        0
      );
  };

  return (
    <div ref={wrapper} class={styles.Intro}>
      <For each={steps}>
        {(step) => (
          <section>
            <div class="outer">
              <div class="inner">
                <div
                  class="blur-mask"
                  style={{
                    "mask-image": `radial-gradient(${maskImage()})`,
                    "-webkit-mask-image": `radial-gradient(${maskImage()})`,
                  }}
                />
                <div class="bg">
                  <div style={getBackground(step)} />
                </div>
                <div class="title-grid">
                  {step.title && (
                    <h2 class={getTitleClass(step.title)}>{step.title}</h2>
                  )}
                  {!step.title && (
                    <>
                      {steps.map(({ title }, index) => (
                        <h2
                          class={[
                            getTitleClass(title),
                            index < 3 ? "" : "dimmed",
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
              getTitleClass(title),
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
