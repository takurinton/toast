import React from "react";
import { useInteractions } from "@floating-ui/react";
import { ToastContext } from "./ToastContext";
import { useToasts } from "./hooks";
import { ProviderType } from "./types";
import { ToastContent } from "./ToastContent";
import { getToastPosition } from "./utils";

export function ToastProvider({
  placement: defaultPlacement = "bottom",
  delay = 5000,
  autoClose = true,
  requestClose = false,
  transition = {
    duration: 300,
    initial: () => ({
      opacity: 0,
      maxHeight: 0,
    }),
    open: ({ side }) => ({
      opacity: 1,
      transform: {
        top: "translateY(-0.5rem)",
        right: "translateX(0.5rem)",
        bottom: "translateY(0.5rem)",
        left: "translateX(-0.5rem)",
      }[side],
    }),
    close: ({ side }) => ({
      opacity: 0,
      maxHeight: 0,
      transform: {
        top: "translateY(0.5rem)",
        right: "translateX(-0.5rem)",
        bottom: "translateY(-0.5rem)",
        left: "translateX(0.5rem)",
      }[side],
    }),
  },
  background,
  color,
  closeable,
  render,
  children,
}: ProviderType) {
  const context = useToasts();
  const { getFloatingProps } = useInteractions();

  // add default toast placement to placements Set
  const placements = context.placements.add(defaultPlacement);

  return (
    <ToastContext.Provider value={context}>
      {Array.from(placements).map((placement) => {
        const toasts = context.toasts
          .map((toast) => {
            if (!toast.placement) {
              // if placement undefined, set default placement
              return { ...toast, placement: defaultPlacement };
            }
            return toast;
          })
          .filter((toast) => toast.placement === placement);

        return (
          <ul
            key={placement}
            aria-live="polite"
            style={{
              position: "absolute",
              pointerEvents: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              zIndex: 9999,
              ...getToastPosition(placement),
            }}
            {...getFloatingProps({
              role: "region",
            })}
          >
            {toasts.map((toast, index) => (
              <ToastContent
                key={toast.id}
                id={toast.id}
                placement={toast.placement ?? placement}
                autoClose={toast.autoClose ?? autoClose}
                delay={toast.delay ?? delay}
                transition={
                  toast.transition
                    ? { ...transition, ...toast.transition }
                    : transition
                }
                ref={(node) => {
                  context.listRef.current[index] = node;
                }}
                requestClose={toast.requestClose ?? requestClose}
                text={toast.text}
                background={toast.background ?? background}
                color={toast.color ?? color}
                closeable={toast.closeable ?? closeable}
                render={toast.render ?? render}
              ></ToastContent>
            ))}
          </ul>
        );
      })}
      {children}
    </ToastContext.Provider>
  );
}
