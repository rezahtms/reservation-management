"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { buttonVariants } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "cn";
import { formatJalali, parseJalaliISO, toISODate } from "@/lib/utils/date.util";

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function FormDatePicker<T extends FieldValues>({
  name,
  label,
  placeholder = "تاریخ را انتخاب کنید",
  disabled,
  className,
}: FormDatePickerProps<T>) {
  const { control, setValue } = useFormContext<T>();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedDateValue = field.value
          ? parseJalaliISO(String(field.value)) ?? undefined
          : undefined;

        return (
          <FormItem className={className}>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <FormControl>
                <PopoverTrigger
                  disabled={disabled}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-10 w-full justify-start rounded-lg bg-white px-3.5 text-right font-normal shadow-2xs hover:border-primary/40",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="ml-2 size-4 text-primary/70" />
                  {selectedDateValue
                    ? formatJalali(selectedDateValue)
                    : placeholder}
                </PopoverTrigger>
              </FormControl>
              <PopoverContent className="w-auto rounded-xl p-2" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDateValue}
                  onSelect={(selectedDate) => {
                    if (!selectedDate) return;
                    const isoDate = toISODate(selectedDate);
                    field.onChange(isoDate);
                    setValue(name, isoDate as T[Path<T>], {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    setIsOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export { FormDatePicker };
export default FormDatePicker;
