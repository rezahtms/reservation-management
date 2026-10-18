"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { Calendar, Clock, Phone, Scissors, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import {
  STATUS_LABELS,
  STATUS_VARIANTS,
} from "@/lib/constants/reservations.const";
import { formatJalaliString } from "@/lib/utils/date.util";
import { formatPhone, toPersianDigits } from "@/lib/utils/persian.util";
import type { Reservation, ReservationStatus } from "@/lib/types";

const RESERVATION_STATUS_ACTIONS: {
  nextStatus: ReservationStatus;
  label: string;
}[] = [
  { nextStatus: "confirmed", label: "تایید رزرو" },
  { nextStatus: "canceled", label: "لغو رزرو" },
  { nextStatus: "completed", label: "انجام شد" },
];

interface ReservationDetailsDialogProps {
  reservation: Reservation | null;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onStatusChange: (reservationId: string, status: ReservationStatus) => void;
}

function ReservationDetailsDialog({
  reservation,
  open,
  onOpenChange,
  onStatusChange,
}: ReservationDetailsDialogProps) {
  if (!reservation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">جزئیات رزرو</DialogTitle>
          <DialogDescription>
            مشاهده اطلاعات کامل و تغییر وضعیت نوبت مشتری
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <UserRound className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900">
                {toPersianDigits(reservation.customerName)}
              </p>
              <div className="mt-1">
                <Badge variant={STATUS_VARIANTS[reservation.status]}>
                  {STATUS_LABELS[reservation.status]}
                </Badge>
              </div>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-3.5 rounded-xl border border-slate-200/80 p-3.5 text-sm sm:grid-cols-2">
            <ReservationDetailItem
              icon={Phone}
              label="شماره تماس"
              value={formatPhone(reservation.phone)}
              dir="ltr"
            />
            <ReservationDetailItem
              icon={Scissors}
              label="نوع خدمت"
              value={reservation.service}
            />
            <ReservationDetailItem
              icon={Calendar}
              label="تاریخ"
              value={formatJalaliString(reservation.date)}
            />
            <ReservationDetailItem
              icon={Clock}
              label="ساعت"
              value={toPersianDigits(reservation.time)}
            />
          </dl>
          {reservation.notes ? (
            <div className="space-y-2">
              <Label>یادداشت</Label>
              <Textarea
                value={toPersianDigits(reservation.notes)}
                readOnly
                rows={2}
              />
            </div>
          ) : null}
        </div>
        <DialogFooter className="flex-col sm:flex-row-reverse">
          {RESERVATION_STATUS_ACTIONS.filter(
            (statusAction) => statusAction.nextStatus !== reservation.status,
          ).map((statusAction) => (
            <Button
              key={statusAction.nextStatus}
              variant={
                statusAction.nextStatus === "canceled"
                  ? "destructive"
                  : "default"
              }
              size="sm"
              className="rounded-lg"
              onClick={() =>
                onStatusChange(reservation.id, statusAction.nextStatus)
              }
            >
              {statusAction.label}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface ReservationDetailItemProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  dir?: "rtl" | "ltr";
}

function ReservationDetailItem({
  icon: DetailIcon,
  label,
  value,
  dir = "rtl",
}: ReservationDetailItemProps) {
  return (
    <div className="flex items-start gap-2.5">
      <DetailIcon className="mt-0.5 size-4 shrink-0 text-primary/70" />
      <div className="min-w-0">
        <dt className="text-[11px] text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 truncate font-semibold text-slate-900" dir={dir}>
          {value}
        </dd>
      </div>
    </div>
  );
}

export { ReservationDetailsDialog };
export default dynamic(() => Promise.resolve(ReservationDetailsDialog), {
  ssr: false,
});
