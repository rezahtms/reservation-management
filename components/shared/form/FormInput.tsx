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
import { Input } from "@/components/ui/Input";
import { toEnglishDigits, toPersianDigits } from "@/lib/utils/persian.util";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  dir?: "rtl" | "ltr";
  numericOnly?: boolean;
  maxLength?: number;
  className?: string;
}

function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  disabled,
  autoComplete,
  inputMode,
  dir,
  numericOnly = false,
  maxLength,
  className,
}: FormInputProps<T>) {
  const { control } = useFormContext<T>();

  const resolvedInputType =
    type === "email" || type === "number" || type === "tel" ? "text" : type;

  const resolvedInputMode =
    inputMode ??
    (numericOnly || type === "number" || type === "tel"
      ? "numeric"
      : type === "email"
        ? "email"
        : undefined);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const rawFieldValue = String(field.value ?? "");
        const displayValue = toPersianDigits(rawFieldValue);

        const handleInputChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          const englishNormalizedValue = toEnglishDigits(event.target.value);
          const sanitizedValue = numericOnly
            ? englishNormalizedValue.replace(/[^0-9]/g, "")
            : englishNormalizedValue;
          field.onChange(sanitizedValue);
        };

        return (
          <FormItem className={className}>
            {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
            <FormControl>
              <Input
                id={name}
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type={resolvedInputType}
                placeholder={placeholder ? toPersianDigits(placeholder) : undefined}
                disabled={disabled}
                autoComplete={autoComplete}
                inputMode={resolvedInputMode}
                maxLength={maxLength}
                dir={dir}
                value={displayValue}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export { FormInput };
export default FormInput;
