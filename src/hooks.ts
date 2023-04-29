import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useToastsContext } from "./ToastContext";
import { generateUEID, noop } from "./utils";
import { Id, ToastPlacement, ToastType, ToastsType } from "./types";

// Pauses closing the toast when the mouse is over the toast
export const useTimeout = (fn: (...args: any) => void, duration: number) => {
  const [isRunning, setIsRunning] = useState(true);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning) {
      const timerId = setTimeout(() => {
        fn();
      }, duration);

      return () => clearTimeout(timerId);
    }
    return noop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  return {
    start,
    stop,
  };
};

export function useToasts() {
  const [toasts, setToasts] = useState<ToastsType>([]);
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const [placements, setPlacements] = useState(new Set<ToastPlacement>([]));

  const toast = useCallback(
    ({
      placement,
      delay,
      transition,
      autoClose,
      text,
      background,
      color,
      closeable,
      render,
    }: Omit<ToastType, "id">) => {
      setPlacements((prev) => {
        if (!placement) {
          return new Set(prev);
        }

        const placements = new Set(prev);
        placements.add(placement);
        return placements;
      });
      setToasts((prev) => [
        ...prev,
        {
          id: generateUEID(),
          placement,
          delay,
          transition,
          autoClose,
          text,
          background,
          color,
          closeable,
          render,
        },
      ]);
    },
    []
  );

  const close = useCallback((toastId: Id) => {
    setToasts((prev) => {
      const t = prev.map((toast) => {
        if (toast.id === toastId) {
          return {
            ...toast,
            requestClose: true,
          };
        }
        return toast;
      });
      return t;
    });
  }, []);

  const closeAll = useCallback(() => {
    const t = toasts.map((toast) => ({
      ...toast,
      requestClose: true,
    }));
    setToasts(t);
  }, [toasts]);

  return useMemo(
    () => ({
      listRef,
      toasts,
      placements,
      toast,
      close,
      closeAll,
    }),
    [listRef, toasts, placements, toast, close, closeAll]
  );
}

export const useToast = () => {
  const context = useToastsContext();
  if (context == null) {
    throw new Error("Toast components must be wrapped in <ToastProvider />");
  }

  return {
    toast: context.toast,
    close: context.close,
    toasts: context.toasts,
    closeAll: context.closeAll,
  };
};
