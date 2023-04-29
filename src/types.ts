import { Alignment, UseTransitionStylesProps } from "@floating-ui/react";
import { MutableRefObject, ReactNode } from "react";

export type ToastPlacement =
  | "top"
  | "bottom"
  | `top-${Alignment}`
  | `bottom-${Alignment}`;

export type Id = string;
export type ToastType = {
  id: Id;
  delay?: number;
  autoClose?: boolean;
  requestClose?: boolean;
  transition?: UseTransitionStylesProps;
  placement?: ToastPlacement;
  text?: ReactNode;
  background?: string;
  color?: string;
  closeable?: boolean;
  render?: (id: Id, onClose?: () => void) => ReactNode;
};
export type ToastsType = Array<ToastType>;

export type ContextType = {
  listRef: MutableRefObject<Array<HTMLElement | null>>;
  toasts: ToastsType;
  placements: Set<ToastPlacement>;
  toast: (toast: Omit<ToastType, "id">) => void;
  close: (toastId: Id) => void;
  closeAll: () => void;
};

export type ProviderType = Partial<ToastType> & {
  children: ReactNode;
};
