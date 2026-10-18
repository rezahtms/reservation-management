"use client";

import * as React from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";
import { toEnglishDigits, toPersianDigits } from "@/lib/utils/persian.util";

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

function FormTextarea<T extends FieldValues>({
  name,
  label,
  placeholder,
  rows = 3,
  disabled,
  className,
}: FormTextareaProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const displayValue = toPersianDigits(String(field.value ?? ""));

        const handleTextareaChange = (
          event: React.ChangeEvent<HTMLTextAreaElement>,
        ) => {
          field.onChange(toEnglishDigits(event.target.value));
        };

        return (
          <FormItem className={className}>
            {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
            <FormControl>
              <Textarea
                id={name}
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                placeholder={placeholder ? toPersianDigits(placeholder) : undefined}
                rows={rows}
                disabled={disabled}
                value={displayValue}
                onChange={handleTextareaChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export { FormTextarea };
export default FormTextarea;
