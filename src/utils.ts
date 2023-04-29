import { ToastPlacement } from "./types";

export const generateUEID = () => {
  const first = ("000" + ((Math.random() * 46656) | 0).toString(36)).slice(-3);
  const second = ("000" + ((Math.random() * 46656) | 0).toString(36)).slice(-3);
  return `${first}${second}`;
};

export const getToastPosition = (placement?: ToastPlacement) => {
  if (placement == null) return {};

  const placements = placement.split("-");
  if (placements[0] === "top" || placements[0] === "bottom") {
    return {
      margin: "0 auto",
      top: placements[0] === "top" ? "20px" : undefined,
      bottom: placements[0] === "bottom" ? "20px" : undefined,
      left:
        placements[1] === undefined
          ? 0
          : placements[1] === "start"
          ? "20px"
          : "auto",
      right:
        placements[1] === undefined
          ? 0
          : placements[1] === "end"
          ? "20px"
          : "auto",
    };
  }

  return {};
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};
