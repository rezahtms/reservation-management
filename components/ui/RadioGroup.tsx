"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { cn } from "cn";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive>) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioPrimitive.Root>) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "relative aspect-square size-4 rounded-full border border-primary text-primary shadow-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:border-primary",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        className="absolute inset-0 grid place-items-center"
      >
        <div className="size-2 rounded-full bg-current" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
