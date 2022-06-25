import type { Component } from "solid-js";
import { createSignal, For, onCleanup, onMount } from "solid-js";
import gsap from "gsap";
import { wh, ww } from "../store/window";
const [cw, setCw] = createSignal(0);
const HomeCarousel: Component = () => {
  let carouselRef: HTMLDivElement | undefined;
  const images = [
    "",
    "Paul-Woods-Hibernia-110-x140cm-oil-on-canvas-2016.jpeg",
    "Paul-Woods-The-Somme-on-the-Liffey-200x140cm-oil-on-canvas-2016.jpeg",
    "Paul-Woods-The-Theatre-150x100cm-oil-on-canvas-2015.jpeg",
    "Paul_Woods-Aftermath-GPO-150x100cm_oil-on-canvas_2015.jpeg",
    "Paul_Woods-For-our-Future_oil-on-canvas_2016.jpeg",
    "Paul_Woods-The-Somme-on-the-Liffey_oil-on-canvas_2016.jpeg",
  ];
  const updateScroll = () => {
    setCw(carouselRef?.offsetWidth || wh());
    gsap.to(".carousel-track", {
      scrollTrigger: {
        trigger: ".carousel-wrapper",
        pin: true,
        scrub: 1,
        pinSpacing: false,
        snap: 1 / images.length,
        end: () => "+=" + cw() || 0,
      },
      x: () => -(carouselRef?.scrollWidth || 0 - ww()) + "px",
      ease: "none",
    });
  };
  let observer: ResizeObserver | null;
  onMount(() => {
    if (carouselRef instanceof HTMLDivElement) {
      observer = new ResizeObserver(() => {
        updateScroll();
      });
      observer.observe(carouselRef);
    }
  });
  onCleanup(() => {
    if (
      observer instanceof ResizeObserver &&
      carouselRef instanceof HTMLDivElement
    ) {
      observer.unobserve(carouselRef);
    }
  });

  return (
    <div
      class="home-carousel"
      ref={carouselRef}
      style={{
        "--carousel-height": `${cw()}px`,
      }}
    >
      <div class="carousel-track">
        <For each={images}>
          {(image) => (
            <div class="carousel-slide" data-cw={cw()}>
              {image && (
                <div class="frame">
                  <img src={"/assets/gallery/" + image} />
                </div>
              )}
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default HomeCarousel;
