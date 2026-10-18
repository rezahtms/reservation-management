"use client";

import { create } from "zustand";
import type { Reservation, ReservationStatus } from "@/lib/types";
import { INITIAL_RESERVATIONS } from "@/lib/constants/reservations.const";
import { toEnglishDigits } from "@/lib/utils/persian.util";

type CreateReservationPayload = Omit<
  Reservation,
  "id" | "createdAt" | "status"
>;

interface ReservationState {
  items: Reservation[];
  add: (payload: CreateReservationPayload) => Reservation;
  updateStatus: (reservationId: string, status: ReservationStatus) => void;
  remove: (reservationId: string) => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  items: INITIAL_RESERVATIONS,
  add: (payload) => {
    const newReservation: Reservation = {
      id: `r-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      ...payload,
      phone: toEnglishDigits(payload.phone),
      date: toEnglishDigits(payload.date),
      time: toEnglishDigits(payload.time),
    };
    set((state) => ({ items: [newReservation, ...state.items] }));
    return newReservation;
  },
  updateStatus: (reservationId, status) =>
    set((state) => ({
      items: state.items.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status }
          : reservation,
      ),
    })),
  remove: (reservationId) =>
    set((state) => ({
      items: state.items.filter(
        (reservation) => reservation.id !== reservationId,
      ),
    })),
}));
