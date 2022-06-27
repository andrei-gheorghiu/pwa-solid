import type { Component } from "solid-js";
import { For } from "solid-js";
import { xPos, yPos } from "../store/window";

interface CursorProps {
  size?: number;
  outerRadius?: number;
  innerRadius?: number;
  circleStroke?: number;
  thickStroke?: number;
  thinStroke?: number;
  innerOffset?: number;
  outerOffset?: number;
}

type Axis = "x" | "y";

const CrossHair: Component<CursorProps> = ({
  size = 120,
  outerRadius = 50,
  innerRadius = 35,
  circleStroke = 1,
  thickStroke = 3,
  thinStroke = 1,
  innerOffset = 20,
  outerOffset = 5,
}: CursorProps) => {
  const half = size / 2;
  const circles = [outerRadius, innerRadius];
  const directions: Axis[] = ["x", "y"];
  const otherAxis = (axis: Axis): Axis => (axis === "x" ? "y" : "x");
  const makeLine = ({
    axis,
    ...rest
  }: Record<string, unknown> & { axis: Axis }) => ({
    [otherAxis(axis) + "1"]: half,
    [otherAxis(axis) + "2"]: half,
    stroke: "currentColor",
    ...rest,
  });
  const makeCircle = (r: number) => ({
    r,
    cx: half,
    cy: half,
    stroke: "currentColor",
    "stroke-width": circleStroke,
    "fill-opacity": 0,
  });

  return (
    <div
      class="cross-hair"
      style={{
        left: `${xPos()}px`,
        top: `${yPos()}px`,
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <For each={circles}>{(r) => <circle {...makeCircle(r)} />}</For>
        <For each={[1, -1]}>
          {(side) => (
            <For each={directions}>
              {(axis) => (
                <>
                  <line
                    {...makeLine({
                      axis,
                      [axis + "1"]: half + (outerRadius + outerOffset) * side,
                      [axis + "2"]: half + (innerRadius - outerOffset) * side,
                      "stroke-width": thickStroke,
                    })}
                  />
                  <line
                    {...makeLine({
                      axis,
                      [axis + "1"]: half + (innerRadius - outerOffset) * side,
                      [axis + "2"]: half + (innerRadius - innerOffset) * side,
                      "stroke-width": thinStroke,
                    })}
                  />
                </>
              )}
            </For>
          )}
        </For>
      </svg>
    </div>
  );
};

export default CrossHair;
