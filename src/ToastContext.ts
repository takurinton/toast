import { createContext, useContext } from "react";
import { ContextType } from "./types";

export const ToastContext = createContext<ContextType>(null as any);

export const useToastsContext = () => {
  const context = useContext(ToastContext);

  if (context == null) {
    throw new Error("Toast components must be wrapped in <ToastProvider />");
  }

  return context;
};
