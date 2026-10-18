"use client";

import NewReservationSheet from "@/components/pages/dashboard/NewReservationSheet";
import ReservationDetailsDialog from "@/components/pages/dashboard/ReservationDetailsDialog";
import ReservationsTable from "@/components/pages/dashboard/ReservationsTable";
import StatCard from "@/components/pages/dashboard/StatCard";
import { Button } from "@/components/ui/Button";
import { useReservations } from "@/lib/hooks/useReservations";
import type { Reservation, ReservationStatus } from "@/lib/types";
import {
  CalendarCheck,
  CalendarClock,
  CalendarOff,
  CalendarRange,
  ListChecks,
  Plus,
} from "lucide-react";
import * as React from "react";

function DashboardView() {
  const {
    items: filteredReservations,
    stats: reservationStats,
    filters,
    hasActiveFilters,
    setQuery,
    setStatus,
    resetFilters,
    add: addReservation,
    updateStatus: updateReservationStatus,
  } = useReservations();

  const [isNewReservationOpen, setIsNewReservationOpen] = React.useState(false);
  const [selectedReservation, setSelectedReservation] =
    React.useState<Reservation | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = React.useState(false);

  const handleReservationStatusChange = (
    reservationId: string,
    nextStatus: ReservationStatus,
  ) => {
    updateReservationStatus(reservationId, nextStatus);
    setIsDetailsDialogOpen(false);
  };

  const handleOpenReservationDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-gradient-to-l from-indigo-50/70 via-white to-white p-5 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            داشبورد مدیریت نوبت‌ها
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            نمای کلی از رزروهای ثبت‌شده، وضعیت نوبت‌ها و جستجوی پیشرفته
          </p>
        </div>
        <Button
          size="lg"
          className="h-11 gap-2 rounded-xl px-5 font-semibold shadow-sm shadow-primary/25"
          onClick={() => setIsNewReservationOpen(true)}
        >
          <Plus className="size-4" />
          ثبت رزرو جدید
        </Button>
      </section>

      <section
        className="grid grid-cols-2 gap-3.5 md:grid-cols-5"
        aria-label="آمار رزروها"
      >
        <StatCard
          label="کل رزروها"
          value={reservationStats.total}
          icon={CalendarRange}
          accent="bg-indigo-500/10 text-indigo-600"
        />
        <StatCard
          label="تایید شده"
          value={reservationStats.confirmed}
          icon={CalendarCheck}
          accent="bg-emerald-500/10 text-emerald-600"
        />
        <StatCard
          label="در انتظار"
          value={reservationStats.pending}
          icon={CalendarClock}
          accent="bg-amber-500/10 text-amber-600"
        />
        <StatCard
          label="لغو شده"
          value={reservationStats.canceled}
          icon={CalendarOff}
          accent="bg-rose-500/10 text-rose-600"
        />
        <StatCard
          label="انجام شده"
          value={reservationStats.completed}
          icon={ListChecks}
          accent="bg-violet-500/10 text-violet-600"
        />
      </section>

      <section aria-label="فهرست رزروها">
        <ReservationsTable
          items={filteredReservations}
          query={filters.query}
          status={filters.status}
          hasActiveFilters={hasActiveFilters}
          onQueryChange={setQuery}
          onStatusChange={setStatus}
          onResetFilters={resetFilters}
          onOpenDetails={handleOpenReservationDetails}
        />
      </section>

      <NewReservationSheet
        open={isNewReservationOpen}
        onOpenChange={setIsNewReservationOpen}
        onSubmit={(newReservationPayload) => {
          addReservation(newReservationPayload);
        }}
      />

      <ReservationDetailsDialog
        reservation={selectedReservation}
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        onStatusChange={handleReservationStatusChange}
      />
    </div>
  );
}

export { DashboardView };
export default DashboardView;
