"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { X } from "lucide-react";
import { cn } from "cn";

function useIsDesktop(breakpoint = 768) {
  const subscribe = React.useCallback(
    (cb: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    [breakpoint],
  );

  const getSnapshot = React.useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
  }, [breakpoint]);

  const isDesktop = React.useSyncExternalStore(subscribe, getSnapshot, () => false);
  const mounted = useIsClient();

  return { isDesktop, mounted };
}

function useIsClient() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);
  return mounted;
}

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Sheet({ open, onOpenChange, children }: SheetProps) {
  const { isDesktop, mounted } = useIsDesktop();
  if (!mounted) return null;
  const Root = isDesktop ? DialogPrimitive.Root : DrawerPrimitive.Root;
  return (
    <Root open={open} onOpenChange={onOpenChange} modal>
      {children}
    </Root>
  );
}

function SheetTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return (
    <DialogPrimitive.Trigger
      data-slot="sheet-trigger"
      className={className}
      {...props}
    />
  );
}

function SheetClose({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      data-slot="sheet-close"
      className={className}
      {...props}
    />
  );
}

interface SheetContentProps extends React.ComponentProps<"div"> {
  side?: "left" | "right";
}

function SheetContent({
  className,
  children,
  side = "left",
  ...props
}: SheetContentProps) {
  const { isDesktop } = useIsDesktop();

  if (isDesktop) {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <DialogPrimitive.Popup
          data-slot="sheet-content"
          className={cn(
            "fixed z-50 flex flex-col gap-4 border bg-background p-6 shadow-lg transition-all data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
            "inset-y-0 w-full max-w-md",
            side === "right"
              ? "right-0 border-l data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full"
              : "left-0 border-r data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
            className,
          )}
        >
          {children}
          <DialogPrimitive.Close className="absolute left-4 top-4 rounded-md p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <X className="size-4" />
            <span className="sr-only">بستن</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    );
  }

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <DrawerPrimitive.Popup
        data-slot="sheet-content"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[92dvh] flex-col gap-4 rounded-t-2xl border-t bg-background p-6 shadow-lg transition-transform data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full",
          className,
        )}
        {...(props as object)}
      >
        <div className="mx-auto -mt-2 h-1.5 w-12 shrink-0 rounded-full bg-muted" />
        {children}
        <DrawerPrimitive.Close className="absolute left-4 top-4 rounded-md p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden">
          <X className="size-4" />
          <span className="sr-only">بستن</span>
        </DrawerPrimitive.Close>
      </DrawerPrimitive.Popup>
    </DrawerPrimitive.Portal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 text-right", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-start",
        className,
      )}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-base font-semibold leading-none", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
