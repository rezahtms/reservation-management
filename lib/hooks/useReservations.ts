"use client";

import { useDebounce } from "@/lib/hooks/useDebounce";
import { useSearchParamsFilter } from "@/lib/hooks/useSearchParams";
import { useReservationStore } from "@/lib/stores/reservation.store";
import type { ReservationStatus } from "@/lib/types";
import { toEnglishDigits } from "@/lib/utils/persian.util";
import * as React from "react";

export type FilterStatus = ReservationStatus | "all";

type ReservationSearchFilterParams = {
  query: string;
  status: string;
};

const VALID_STATUSES: ReadonlyArray<FilterStatus> = [
  "all",
  "confirmed",
  "pending",
  "canceled",
  "completed",
];

function normalizeFilterStatus(rawStatus: string): FilterStatus {
  return VALID_STATUSES.includes(rawStatus as FilterStatus)
    ? (rawStatus as FilterStatus)
    : "all";
}

const DEFAULT_RESERVATION_FILTERS: ReservationSearchFilterParams = {
  query: "",
  status: "all",
};

export function useReservations() {
  const reservations = useReservationStore((state) => state.items);
  const addReservation = useReservationStore((state) => state.add);
  const updateReservationStatus = useReservationStore(
    (state) => state.updateStatus,
  );
  const removeReservation = useReservationStore((state) => state.remove);

  const { filters: rawFilters, setFilter, resetFilters } =
    useSearchParamsFilter<ReservationSearchFilterParams>(
      DEFAULT_RESERVATION_FILTERS,
    );

  const activeStatus = normalizeFilterStatus(rawFilters.status);
  const searchQuery = rawFilters.query;
  const debouncedQuery = useDebounce(searchQuery, 250);

  const hasActiveFilters =
    searchQuery.trim().length > 0 || activeStatus !== "all";

  const filteredReservations = React.useMemo(() => {
    const normalizedQuery = toEnglishDigits(debouncedQuery)
      .trim()
      .toLowerCase();

    return reservations.filter((reservation) => {
      const matchesStatus =
        activeStatus === "all" || reservation.status === activeStatus;
      if (!matchesStatus) return false;
      if (!normalizedQuery) return true;

      const normalizedCustomerName = toEnglishDigits(
        reservation.customerName,
      ).toLowerCase();
      const normalizedPhone = toEnglishDigits(reservation.phone);
      const normalizedService = toEnglishDigits(
        reservation.service,
      ).toLowerCase();

      return (
        normalizedCustomerName.includes(normalizedQuery) ||
        normalizedPhone.includes(normalizedQuery) ||
        normalizedService.includes(normalizedQuery)
      );
    });
  }, [reservations, debouncedQuery, activeStatus]);

  const reservationStats = React.useMemo(() => {
    const total = reservations.length;
    const confirmed = reservations.filter(
      (reservation) => reservation.status === "confirmed",
    ).length;
    const pending = reservations.filter(
      (reservation) => reservation.status === "pending",
    ).length;
    const canceled = reservations.filter(
      (reservation) => reservation.status === "canceled",
    ).length;
    const completed = reservations.filter(
      (reservation) => reservation.status === "completed",
    ).length;
    return { total, confirmed, pending, canceled, completed };
  }, [reservations]);

  const handleQueryChange = React.useCallback(
    (nextQuery: string) => {
      setFilter("query", toEnglishDigits(nextQuery));
    },
    [setFilter],
  );

  const handleStatusChange = React.useCallback(
    (nextStatus: FilterStatus) => {
      setFilter("status", nextStatus);
    },
    [setFilter],
  );

  return {
    items: filteredReservations,
    stats: reservationStats,
    filters: {
      query: searchQuery,
      status: activeStatus,
    },
    hasActiveFilters,
    setQuery: handleQueryChange,
    setStatus: handleStatusChange,
    resetFilters,
    add: addReservation,
    updateStatus: updateReservationStatus,
    remove: removeReservation,
  };
}
