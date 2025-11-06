export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: [
    {
      public_id: string;
      url: string;
    }
  ];
  isPaid: "unpaid" | "paid" | "refunded";
  role: "admin" | "doctor" | "patient";
}

export interface IAppointment {
  _id: string;
  user: IUser;
  date: string | Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  isPaid: "unpaid" | "paid" | "refunded";
  reason: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
}

export type FilterStatus =
  | "all"
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface IEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface IWorkingHours {
  dayOfWeek: number;
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface DoctorSignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;

  speciality: string;
  experience: string;
  about: string;
  fee: number;

  education: IEducation[];

  services: string[];

  address: IAddress;

  appointmentDurationMinutes: number;
  workingHours: IWorkingHours[];

  role: "doctor";
}

export const DAYS_OF_WEEK = [
  { label: "Pazartesi", value: 1 },
  { label: "Salı", value: 2 },
  { label: "Çarşamba", value: 3 },
  { label: "Perşembe", value: 4 },
  { label: "Cuma", value: 5 },
  { label: "Cumartesi", value: 6 },
  { label: "Pazar", value: 0 },
];

export const SPECIALITIES = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Ophthalmology",
  "Ear, Nose and Throat",
  "General Surgery",
  "Internal Medicine",
  "Psychiatry",
];
