"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "cn";
import { Label } from "@/components/ui/Label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null,
);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();
  if (!fieldContext) {
    throw new Error("useFormField must be used within <FormField>");
  }
  const fieldState = getFieldState(fieldContext.name, formState);
  return { name: fieldContext.name, ...fieldState };
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-item"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { error } = useFormField();
  return (
    <Label
      data-slot="form-label"
      className={cn(error && "text-destructive", className)}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<"div">) {
  const { error } = useFormField();
  return (
    <div
      data-slot="form-control"
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="form-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error } = useFormField();
  const messageBody = error ? String(error.message) : props.children;
  if (!messageBody) return null;
  return (
    <p
      data-slot="form-message"
      className={cn("text-xs font-medium text-destructive", className)}
      {...props}
    >
      {messageBody}
    </p>
  );
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};
