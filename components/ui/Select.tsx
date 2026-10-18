"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "cn";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<
    React.ComponentProps<typeof SelectPrimitive.Root>,
    "children" | "onValueChange" | "items"
  > {
  placeholder?: string;
  options: SelectOption[];
  className?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
}

function Select({
  placeholder,
  options,
  className,
  onChange,
  onValueChange,
  value,
  ...props
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      items={options}
      value={value}
      onValueChange={(nextValue: unknown) => {
        const stringValue = String(nextValue ?? "");
        onValueChange?.(stringValue);
        onChange?.(stringValue);
      }}
      {...props}
    >
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-input bg-white px-3.5 py-2 text-sm shadow-2xs outline-none transition-all hover:border-primary/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <SelectPrimitive.Value
          data-slot="select-value"
          placeholder={
            <span className="text-muted-foreground">{placeholder}</span>
          }
        >
          {(selectedValue: unknown) => {
            const normalizedValue =
              typeof selectedValue === "string"
                ? selectedValue
                : String(selectedValue ?? "");
            const matchedOption = options.find(
              (option) => option.value === normalizedValue,
            );
            if (matchedOption) {
              return matchedOption.label;
            }
            return placeholder ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              normalizedValue
            );
          }}
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon>
          <ChevronDown className="size-4 text-muted-foreground transition-transform" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner
          sideOffset={6}
          align="start"
          alignItemWithTrigger={false}
          className="z-[60] outline-none"
        >
          <SelectPrimitive.Popup
            data-slot="select-content"
            className="relative z-[60] max-h-80 min-w-[var(--anchor-width)] overflow-y-auto rounded-xl border border-border/80 bg-popover p-1.5 text-popover-foreground shadow-lg outline-none data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 origin-[var(--transform-origin)] transition-[transform,opacity]"
          >
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                data-slot="select-item"
                className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-lg py-2 pr-8 pl-3 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <span className="absolute right-2.5 flex size-4 items-center justify-center text-primary">
                  <SelectPrimitive.ItemIndicator>
                    <Check className="size-4" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export { Select };
export type { SelectOption };
