import React, {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ToastType } from "./types";
import {
  FloatingFocusManager,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useTransitionStyles,
} from "@floating-ui/react";
import { useToastsContext } from "./ToastContext";
import { useTimeout } from "./hooks";
import { noop } from "./utils";

export type DefaultToastProps = {
  closeable?: boolean;
  background?: string;
  color?: string;
  closeToast?: () => void;
};
export type ToastContentProps = ToastType & HTMLAttributes<HTMLLIElement>;

export const DefaultToast: FC<PropsWithChildren<DefaultToastProps>> = ({
  closeable,
  background,
  color,
  closeToast,
  children,
}) => {
  return (
    <div
      style={{
        width: "300px",
        backgroundColor: background ?? "rgb(37 99 235)",
        color: color ?? "white",
        padding: "1rem",
        marginBottom: "1rem",
        fontWeight: 700,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
      {closeable && (
        <button
          style={{
            border: "none",
            background: "none",
            color: "white",
            cursor: "pointer",
            marginLeft: "1rem",
          }}
          onClick={closeToast}
        >
          X
        </button>
      )}
    </div>
  );
};

export const ToastContent = forwardRef<HTMLLIElement, ToastContentProps>(
  function ToastContent(
    {
      id,
      delay = 5000,
      transition,
      autoClose,
      requestClose,
      render,
      text,
      background,
      color,
      closeable,
    },
    propRef
  ) {
    const [open, setOpen] = useState(true);
    const [focus, setFocus] = useState(false);
    const { context, refs } = useFloating({
      open,
      onOpenChange: setOpen,
      nodeId: id,
    });
    const ref = useMergeRefs([propRef, refs.setFloating]);
    const dismiss = useDismiss(context, {
      enabled: focus,
      outsidePress: false,
    });
    const { close } = useToastsContext();
    const { getFloatingProps, getItemProps } = useInteractions([dismiss]);
    const { isMounted, styles } = useTransitionStyles(context, transition);

    const closeToastTime = useMemo(() => {
      if (transition?.duration == null) {
        // default duration
        return 300;
      }
      if (typeof transition.duration === "number") {
        return transition.duration;
      }
      return transition.duration.close ?? 300;
    }, [transition?.duration]);

    const closeToast = useCallback(() => {
      setOpen(false);
      setTimeout(() => {
        close(id);
      }, closeToastTime);
    }, [close, closeToastTime, id]);

    const { start, stop } = useTimeout(autoClose ? closeToast : noop, delay);

    useEffect(() => {
      if (requestClose) {
        closeToast();
      }
    }, [requestClose, closeToast]);

    return isMounted ? (
      <FloatingFocusManager
        context={context}
        modal={false}
        order={["floating"]}
        initialFocus={-1}
      >
        <li
          ref={ref}
          role="status"
          aria-atomic="true"
          aria-hidden="false"
          tabIndex={0}
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "100vh",
            alignItems: "center",
            ...styles,
          }}
          {...getFloatingProps()}
          {...getItemProps({
            onFocus: () => {
              setFocus(true);
              stop();
            },
            onBlur: () => {
              setFocus(false);
              start();
            },
            onMouseOver: () => {
              stop();
            },
            onMouseLeave: () => {
              start();
            },
          })}
        >
          <div style={{ pointerEvents: "auto", width: "fit-content" }}>
            {render ? (
              render(id, () => closeToast())
            ) : (
              <DefaultToast
                closeable={closeable}
                background={background}
                color={color}
                closeToast={closeToast}
              >
                {text}
              </DefaultToast>
            )}
          </div>
        </li>
      </FloatingFocusManager>
    ) : null;
  }
);
