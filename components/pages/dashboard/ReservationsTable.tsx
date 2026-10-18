"use client";

import * as React from "react";
import { Eye, RotateCcw, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  STATUS_LABELS,
  STATUS_VARIANTS,
} from "@/lib/constants/reservations.const";
import { formatJalaliString } from "@/lib/utils/date.util";
import {
  formatPhone,
  toEnglishDigits,
  toPersianDigits,
} from "@/lib/utils/persian.util";
import type { Reservation, ReservationStatus } from "@/lib/types";

interface ReservationsTableProps {
  items: Reservation[];
  loading?: boolean;
  query: string;
  status: ReservationStatus | "all";
  hasActiveFilters: boolean;
  onQueryChange: (nextQuery: string) => void;
  onStatusChange: (nextStatus: ReservationStatus | "all") => void;
  onResetFilters: () => void;
  onOpenDetails: (reservation: Reservation) => void;
}

const STATUS_FILTER_OPTIONS: SelectOption[] = [
  { value: "all", label: "همه وضعیت ها" },
  { value: "confirmed", label: STATUS_LABELS.confirmed },
  { value: "pending", label: STATUS_LABELS.pending },
  { value: "canceled", label: STATUS_LABELS.canceled },
  { value: "completed", label: STATUS_LABELS.completed },
];

function ReservationsTable({
  items,
  loading,
  query,
  status,
  hasActiveFilters,
  onQueryChange,
  onStatusChange,
  onResetFilters,
  onOpenDetails,
}: ReservationsTableProps) {
  const displayedQuery = toPersianDigits(query);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onQueryChange(toEnglishDigits(event.target.value));
  };

  return (
    <Card className="rounded-2xl border-slate-200/80 bg-white shadow-xs">
      <CardContent className="p-4 md:p-6">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={displayedQuery}
              onChange={handleSearchInputChange}
              placeholder="جستجو بر اساس نام مشتری، شماره موبایل یا نوع خدمت..."
              className="pr-10"
              aria-label="جستجو در رزروها"
            />
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="w-full sm:w-52">
              <Select
                value={status}
                placeholder="همه وضعیت ها"
                options={STATUS_FILTER_OPTIONS}
                onValueChange={(selectedStatus) =>
                  onStatusChange(selectedStatus as ReservationStatus | "all")
                }
              />
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={!hasActiveFilters}
              onClick={onResetFilters}
              className="h-10 gap-2 rounded-lg border-slate-200 px-3.5 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
              <RotateCcw className="size-3.5" />
              پاک کردن فیلترها
            </Button>
          </div>
        </div>

        <div className="hidden md:block">
          <DesktopReservationsTable
            items={items}
            loading={loading}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={onResetFilters}
            onOpenDetails={onOpenDetails}
          />
        </div>
        <div className="md:hidden">
          <MobileReservationsList
            items={items}
            loading={loading}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={onResetFilters}
            onOpenDetails={onOpenDetails}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface ReservationsListSectionProps {
  items: Reservation[];
  loading?: boolean;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onOpenDetails: (reservation: Reservation) => void;
}

function DesktopReservationsTable({
  items,
  loading,
  hasActiveFilters,
  onResetFilters,
  onOpenDetails,
}: ReservationsListSectionProps) {
  if (loading) {
    return (
      <div className="space-y-2.5">
        <Skeleton className="h-11 w-full rounded-xl" />
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <Skeleton key={rowIndex} className="h-13 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="رزروی مطابق با فیلترها یافت نشد"
        description="می‌توانید عبارت جستجو یا وضعیت انتخاب‌شده را تغییر دهید و دوباره تلاش کنید."
        onReset={hasActiveFilters ? onResetFilters : undefined}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80">
      <Table>
        <TableHeader className="bg-slate-50/90">
          <TableRow className="hover:bg-slate-50/90">
            <TableHead className="font-semibold text-slate-700">
              نام مشتری
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              شماره موبایل
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              نوع خدمت
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              تاریخ نوبت
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              ساعت
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              وضعیت
            </TableHead>
            <TableHead className="w-20 text-center font-semibold text-slate-700">
              جزئیات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((reservation) => (
            <TableRow
              key={reservation.id}
              className="transition-colors hover:bg-indigo-50/30"
            >
              <TableCell className="font-semibold text-slate-900">
                {toPersianDigits(reservation.customerName)}
              </TableCell>
              <TableCell
                dir="ltr"
                className="text-right font-mono text-xs text-slate-600"
              >
                {formatPhone(reservation.phone)}
              </TableCell>
              <TableCell className="text-slate-700">
                {reservation.service}
              </TableCell>
              <TableCell className="text-slate-700">
                {formatJalaliString(reservation.date)}
              </TableCell>
              <TableCell className="font-medium text-slate-800">
                {toPersianDigits(reservation.time)}
              </TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANTS[reservation.status]}>
                  {STATUS_LABELS[reservation.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg text-slate-600 hover:bg-primary/10 hover:text-primary"
                  aria-label={`مشاهده جزئیات ${reservation.customerName}`}
                  onClick={() => onOpenDetails(reservation)}
                >
                  <Eye className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function MobileReservationsList({
  items,
  loading,
  hasActiveFilters,
  onResetFilters,
  onOpenDetails,
}: ReservationsListSectionProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, cardIndex) => (
          <Skeleton key={cardIndex} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="رزروی مطابق با فیلترها یافت نشد"
        description="می‌توانید عبارت جستجو یا وضعیت انتخاب‌شده را تغییر دهید و دوباره تلاش کنید."
        onReset={hasActiveFilters ? onResetFilters : undefined}
      />
    );
  }

  return (
    <ul className="space-y-3" role="list">
      {items.map((reservation) => (
        <li key={reservation.id}>
          <Card className="rounded-xl border-slate-200/80 shadow-2xs">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {toPersianDigits(reservation.customerName)}
                  </p>
                  <p
                    className="mt-1 font-mono text-xs text-muted-foreground"
                    dir="ltr"
                  >
                    {formatPhone(reservation.phone)}
                  </p>
                </div>
                <Badge variant={STATUS_VARIANTS[reservation.status]}>
                  {STATUS_LABELS[reservation.status]}
                </Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-slate-50 p-2.5 text-xs text-muted-foreground">
                <div>
                  <p className="text-[10px]">خدمت</p>
                  <p className="mt-0.5 truncate font-semibold text-slate-900">
                    {reservation.service}
                  </p>
                </div>
                <div>
                  <p className="text-[10px]">تاریخ</p>
                  <p className="mt-0.5 font-semibold text-slate-900">
                    {formatJalaliString(reservation.date)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px]">ساعت</p>
                  <p className="mt-0.5 font-semibold text-slate-900">
                    {toPersianDigits(reservation.time)}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 h-9 w-full rounded-lg"
                onClick={() => onOpenDetails(reservation)}
              >
                <Eye className="ml-1.5 size-3.5" />
                مشاهده جزئیات
              </Button>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export { ReservationsTable };
export default ReservationsTable;
