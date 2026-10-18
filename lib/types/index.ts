export type UserRole = "admin" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type ReservationStatus =
  | "confirmed"
  | "pending"
  | "canceled"
  | "completed";

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  service: ServiceType;
  date: string;
  time: string;
  status: ReservationStatus;
  notes?: string;
  createdAt: string;
}

export type ServiceType =
  | "کوتاهی مو"
  | "رنگ مو"
  | "اصلاح صورت"
  | "مانیکور"
  | "پدیکور"
  | "ماساژ";

export interface LoginPayload {
  email: string;
  password: string;
}
