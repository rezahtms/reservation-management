import { z } from "zod";
import { toEnglishDigits } from "@/lib/utils/persian.util";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "ایمیل را وارد کنید")
    .refine(
      (rawEmail) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEnglishDigits(rawEmail).trim()),
      "فرمت ایمیل وارد شده معتبر نیست",
    ),
  password: z
    .string()
    .min(1, "رمز عبور را وارد کنید")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
