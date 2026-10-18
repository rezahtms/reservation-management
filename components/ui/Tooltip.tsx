"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "cn";

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root {...props} />;
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Popup> & {
  sideOffset?: number;
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner sideOffset={sideOffset} className="z-[60] outline-none">
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-[60] rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md origin-[var(--transform-origin)] transition-[transform,opacity] data-[starting-style]:scale-95 data-[ending-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
