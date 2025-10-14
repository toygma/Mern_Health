import { generateSlugify } from "../../../utils/helper";
import { doctorImages } from "./imageData";

export interface DoctorSlot {
  id: number;
  day: string;
  number: number;
  time?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "doctor";
  speciality: string; // örn: "Cardiologist"
  experience: string; // yıl sayısı veya "0"
  fee: string; // ücret bilgisi
  patients: string; // toplam hasta sayısı
  available: boolean; // müsaitlik durumu
  averageRating: number;
  totalRating: number;
  about: string;
  appointmentDurationMinutes: number;

  // Nested address object
  address: {
    street: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
  };

  // Referanslar / listeler
  appointments: string[];
  reviews: any[]; // İstersen ayrı Review tipi tanımlayabiliriz
  awards: {
    title?: string;
    year?: string | number;
    organization?: string;
  }[];
  education: {
    degree?: string;
    university?: string;
    year?: string | number;
  }[];
  services: string[];
  workingHours: {
    day: string;
    startTime: string;
    endTime: string;
  }[];

  images: [
    {
      public_id: string;
      url: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
}
