# @takurinton/toast

A toast library using [floating-ui](https://floating-ui.com) for React.

## Installation

TBD.  
I'm willing to release it to npm if more than 1 person requests it.

## Usage

Use playground for more detailed behavior.

```tsx
import { ToastProvider, useToast } from "@takurinton/toast";

const Component = () => {
  const { toast } = useToast();

  return (
    <button
      onClick={() =>
        toast({
          text: "top",
        })
      }
    >
      top
    </button>
  );
};

function App() {
  return (
    <ToastProvider placement="top">
      <Component />
    </ToastProvider>
  );
}
```

## API

### useToast

```tsx
const { toast, toasts, close, closeAll } = useToast();
```

#### types

```tsx
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

export declare const useToast: () => {
  toast: (toast: Omit<ToastType, "id">) => void;
  close: (toastId: string) => void;
  toasts: ToastsType;
  closeAll: () => void;
};
```

#### toast

Function to add a toast to the queue.
The following values can be passed by default.

```tsx
toast({
  // The time to wait before the toast is closed.
  delay: 5000;
  // Whether toast closes automatically or not. deley It closes automatically after a period of time.
  autoClose: true;
  // Instruct toast to close. Basically, this is controlled by the render function or the close function.
  requestClose: false;
  // You can specify the animation of toast.
  // see https://floating-ui.com/docs/useTransition#usetransitionstyles
  transition: {
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
  };
  // You can specify the position of toast.
  placement: "top";
  // You can specify the title of toast.
  text: undefined;
  // You can specify the background of toast.
  background: "rgb(37 99 235)";
  // You can specify the text color of toast.
  color: "white";
  // You can specify the icon of toast.
  closeable: false;
  // It can render its own toast.
  // If this is specified, text, background, color and closeable are ignored.
  render: undefined;
});
```

#### toasts

The contents of the queue are returned.

#### close

You can close toast. Specify the id of the toast as an argument.

```tsx
// The toast id can be obtained from the render function
close(id);
```

#### closeAll

All toasts in the queue can be closed.

### ToastProvider

Wrap the area where you want Toast to appear.

```tsx
<ToastProvider>
  <Component />
</ToastProvider>
```

ToastType can be passed to ToastProvider's props, allowing global settings to be applied.
The props specified here can be overridden by individual toast functions.

```tsx
<ToastProvider closeable placement="top" background="rgb(37 99 235)">
  <Component />
</ToastProvider>
```
