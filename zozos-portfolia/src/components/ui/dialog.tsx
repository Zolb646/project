"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within <Dialog />");
  }
  return context;
}

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

function Slot({
  child,
  onClick,
}: {
  child: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
  onClick: React.MouseEventHandler;
}) {
  const originalOnClick = child.props.onClick;

  return React.cloneElement(child, {
    onClick: (event: React.MouseEvent) => {
      originalOnClick?.(event);
      if (!event.defaultPrevented) {
        onClick(event);
      }
    },
  });
}

function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const value = React.useMemo(
    () => ({ open: isOpen, setOpen }),
    [isOpen, setOpen],
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

function DialogTrigger({
  asChild,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  children: React.ReactNode;
}) {
  const { setOpen } = useDialogContext();
  const onClick: React.MouseEventHandler = () => setOpen(true);

  if (
    asChild &&
    React.isValidElement<{ onClick?: React.MouseEventHandler }>(children)
  ) {
    return <Slot child={children} onClick={onClick} />;
  }

  return (
    <button
      type="button"
      data-slot="dialog-trigger"
      className={className}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

function DialogClose({
  asChild,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  children: React.ReactNode;
}) {
  const { setOpen } = useDialogContext();
  const onClick: React.MouseEventHandler = () => setOpen(false);

  if (
    asChild &&
    React.isValidElement<{ onClick?: React.MouseEventHandler }>(children)
  ) {
    return <Slot child={children} onClick={onClick} />;
  }

  return (
    <button
      type="button"
      data-slot="dialog-close"
      className={className}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
}

function DialogOverlay({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useDialogContext();
  if (!open) return null;

  return (
    <div
      data-slot="dialog-overlay"
      className={cx("fixed inset-0 z-50 bg-black/60", className)}
      onClick={() => setOpen(false)}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  showCloseButton?: boolean;
}) {
  const { open, setOpen } = useDialogContext();

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        data-slot="dialog-content"
        role="dialog"
        aria-modal="true"
        className={cx(
          "fixed left-1/2 top-1/2 z-60 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border-3 border-navy bg-cream p-6 text-navy shadow-brutal-lg",
          className,
        )}
        {...props}>
        {children}
        {showCloseButton ? (
          <DialogClose
            className="absolute right-7 top-7 shadow-brutal hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] flex h-8 w-8 items-center justify-center border-2 border-navy bg-accent-yellow text-lg leading-none transition-all duration-150"
            aria-label="Close dialog">
            <FiX />
          </DialogClose>
        ) : null}
      </div>
    </DialogPortal>
  );
}

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-header"
      className={cx("mb-3 space-y-2 text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cx(
        "mt-5 flex flex-wrap items-center justify-end gap-2",
        className,
      )}
      {...props}>
      {children}
      {showCloseButton ? (
        <DialogClose className="inline-flex items-center justify-center border-3 border-navy bg-cream px-4 py-2 font-semibold shadow-brutal">
          Close
        </DialogClose>
      ) : null}
    </div>
  );
}

function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      data-slot="dialog-title"
      className={cx("text-2xl font-bold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="dialog-description"
      className={cx("text-base text-muted", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
