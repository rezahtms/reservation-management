import { z } from "zod";
import { SERVICE_TYPES, TIME_SLOTS } from "@/lib/constants/reservations.const";
import { toEnglishDigits } from "@/lib/utils/persian.util";

const normalizedTimeSlots = TIME_SLOTS.map((slot) => toEnglishDigits(slot));

export const reservationSchema = z.object({
  customerName: z
    .string()
    .min(1, "نام مشتری را وارد کنید")
    .min(2, "نام مشتری باید حداقل ۲ کاراکتر باشد"),
  phone: z
    .string()
    .min(1, "شماره موبایل را وارد کنید")
    .refine(
      (rawPhone) => /^09[0-9]{9}$/.test(toEnglishDigits(rawPhone).trim()),
      "شماره موبایل ایران معتبر نیست",
    ),
  service: z
    .string()
    .min(1, "نوع خدمت را انتخاب کنید")
    .refine(
      (selectedService) =>
        SERVICE_TYPES.includes(
          selectedService as (typeof SERVICE_TYPES)[number],
        ),
      "نوع خدمت معتبر نیست",
    ),
  date: z
    .string()
    .min(1, "تاریخ را انتخاب کنید")
    .refine(
      (rawDate) => /^\d{4}-\d{2}-\d{2}$/.test(toEnglishDigits(rawDate).trim()),
      "تاریخ معتبر نیست",
    ),
  time: z
    .string()
    .min(1, "ساعت را انتخاب کنید")
    .refine(
      (selectedTime) =>
        normalizedTimeSlots.includes(toEnglishDigits(selectedTime).trim()),
      "ساعت معتبر نیست",
    ),
  notes: z.string().optional(),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;
