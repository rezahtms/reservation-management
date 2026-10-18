"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LoginPayload, User } from "@/lib/types";
import { DEMO_CREDENTIALS, SESSION_STORAGE_KEY } from "@/lib/constants/auth.const";
import { toEnglishDigits } from "@/lib/utils/persian.util";

interface AuthState {
  user: User | null;
  hydrated: boolean;
  login: (payload: LoginPayload) => { ok: boolean; error?: string };
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      login: ({ email, password }) => {
        const normalizedEmail = toEnglishDigits(email).trim().toLowerCase();
        const normalizedPassword = toEnglishDigits(password);
        const isEmailValid = normalizedEmail === DEMO_CREDENTIALS.email;
        const isPasswordValid = normalizedPassword === DEMO_CREDENTIALS.password;

        if (!isEmailValid || !isPasswordValid) {
          return { ok: false, error: "ایمیل یا رمز عبور اشتباه است" };
        }

        set({
          user: {
            id: "u-1",
            name: "مدیر سیستم",
            email: DEMO_CREDENTIALS.email,
            role: "admin",
          },
        });
        return { ok: true };
      },
      logout: () => set({ user: null }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: SESSION_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
