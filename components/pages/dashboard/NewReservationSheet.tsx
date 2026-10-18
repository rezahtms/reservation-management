"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { FormInput } from "@/components/shared/form/FormInput";
import { FormSelect } from "@/components/shared/form/FormSelect";
import { FormDatePicker } from "@/components/shared/form/FormDatePicker";
import { FormTextarea } from "@/components/shared/form/FormTextarea";
import {
  SERVICE_TYPES,
  TIME_SLOTS,
} from "@/lib/constants/reservations.const";
import {
  reservationSchema,
  type ReservationFormValues,
} from "@/lib/validations/reservation.validation";
import { toEnglishDigits, toPersianDigits } from "@/lib/utils/persian.util";
import type { Reservation } from "@/lib/types";

interface NewReservationSheetProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (
    payload: Omit<Reservation, "id" | "createdAt" | "status">,
  ) => void;
}

const SERVICE_SELECT_OPTIONS = SERVICE_TYPES.map((serviceType) => ({
  value: serviceType,
  label: serviceType,
}));

const TIME_SLOT_SELECT_OPTIONS = TIME_SLOTS.map((timeSlot) => ({
  value: toEnglishDigits(timeSlot),
  label: toPersianDigits(timeSlot),
}));

function NewReservationSheet({
  open,
  onOpenChange,
  onSubmit,
}: NewReservationSheetProps) {
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  const handleReservationFormSubmit = form.handleSubmit((formValues) => {
    try {
      onSubmit({
        customerName: toEnglishDigits(formValues.customerName).trim(),
        phone: toEnglishDigits(formValues.phone),
        service: formValues.service as Reservation["service"],
        date: toEnglishDigits(formValues.date),
        time: toEnglishDigits(formValues.time),
        notes: formValues.notes
          ? toEnglishDigits(formValues.notes).trim() || undefined
          : undefined,
      });
      form.reset();
      onOpenChange(false);
      toast.success("رزرو جدید با موفقیت ثبت شد");
    } catch {
      toast.error("ثبت رزرو با خطا مواجه شد");
    }
  });

  React.useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="flex flex-col overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">ثبت رزرو جدید</SheetTitle>
          <SheetDescription>
            اطلاعات مشتری، خدمت و زمان نوبت را وارد کنید
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={handleReservationFormSubmit}
            className="flex flex-1 flex-col gap-4 py-2"
          >
            <FormInput<ReservationFormValues>
              name="customerName"
              label="نام و نام خانوادگی مشتری"
              placeholder="مثلاً علی رضایی"
            />
            <FormInput<ReservationFormValues>
              name="phone"
              label="شماره موبایل"
              placeholder="۰۹۱۲xxxxxxx"
              numericOnly
              maxLength={11}
              dir="ltr"
            />
            <FormSelect<ReservationFormValues>
              name="service"
              label="نوع خدمت"
              placeholder="انتخاب خدمت"
              options={SERVICE_SELECT_OPTIONS}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormDatePicker<ReservationFormValues>
                name="date"
                label="تاریخ"
                placeholder="انتخاب تاریخ"
              />
              <FormSelect<ReservationFormValues>
                name="time"
                label="ساعت"
                placeholder="انتخاب ساعت"
                options={TIME_SLOT_SELECT_OPTIONS}
              />
            </div>
            <FormTextarea<ReservationFormValues>
              name="notes"
              label="یادداشت (اختیاری)"
              placeholder="توضیحات یا نکات لازم برای این نوبت"
              rows={3}
            />
            <SheetFooter className="mt-auto gap-2 pt-4">
              <Button
                type="submit"
                size="lg"
                className="h-10 w-full rounded-xl sm:w-auto"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "در حال ثبت..." : "ثبت رزرو"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
              >
                انصراف
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export { NewReservationSheet };
export default dynamic(() => Promise.resolve(NewReservationSheet), {
  ssr: false,
});
