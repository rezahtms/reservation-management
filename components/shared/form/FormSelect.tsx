"use client";

import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Select, type SelectOption } from "@/components/ui/Select";
import { toEnglishDigits } from "@/lib/utils/persian.util";

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
}

function FormSelect<T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  disabled,
  className,
}: FormSelectProps<T>) {
  const { control, setValue } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <Select
              value={field.value ?? ""}
              onValueChange={(selectedValue) => {
                const normalizedValue = toEnglishDigits(selectedValue);
                field.onChange(normalizedValue);
                setValue(name, normalizedValue as T[Path<T>], {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              placeholder={placeholder}
              options={options}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormSelect };
export default FormSelect;
