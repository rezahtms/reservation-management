"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker/persian";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/Button";

export type CalendarProps = Omit<
  React.ComponentProps<typeof DayPicker>,
  "mode"
> & {
  mode?: "single";
  selected?: Date | undefined;
  onSelect?: (selectedDate: Date | undefined) => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      dir="rtl"
      numerals="arabext"
      showOutsideDays={showOutsideDays}
      selected={selected}
      onSelect={onSelect}
      className={cn("p-2", className)}
      classNames={{
        months: "relative flex flex-col gap-4 sm:flex-row sm:gap-0",
        month: "space-y-4",
        month_caption:
          "relative mx-10 flex h-7 items-center justify-center text-sm font-semibold",
        nav: "absolute inset-x-0 top-0 z-10 flex items-center justify-between",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "w-8 rounded-md text-center text-[0.8rem] font-medium text-muted-foreground",
        week: "mt-1 flex w-full",
        day: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-8 p-0 text-[0.85rem] font-normal aria-selected:opacity-100",
        ),
        range_start: "range-start",
        range_end: "range-end",
        selected:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground [&>button]:focus:bg-primary [&>button]:focus:text-primary-foreground",
        today: "[&>button]:bg-accent [&>button]:text-accent-foreground [&>button]:font-semibold",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
