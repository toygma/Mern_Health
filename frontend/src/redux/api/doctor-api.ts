import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Doctor {
  name: string;
  email: string;
  password: string;
  available: boolean;
  role: "doctor" | "admin" | "patient";

  reviews: any[];
  totalRating: number;
  averageRating: number;

  services: string;

  address: {
    street?: string;
    city?: string;
    district?: string;
    postalCode?: string;
    country?: string;
  };

  appointments: any[];
  appointmentDurationMinutes: number;

  images: string[];

  education: {
    degree: string;
    institution: string;
    year: string;
  }[];

  workingHours: {
    dayOfWeek: number;
    isWorking: boolean;
    startTime: string;
    endTime: string;
  }[];
}

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/admin`,
    credentials: "include",
  }),
  tagTypes: ["Doctor"],
  endpoints: (builder) => ({
    getAllDoctors: builder.query<Doctor[], void>({
      query: () => "/all-users",
      providesTags: ["Doctor"],
    }),
    // örnek: bir doktor eklemek için mutation
    addDoctor: builder.mutation<Doctor, Partial<Doctor>>({
      query: (doctor) => {
        return {
          url: "/add-doctor",
          method: "POST",
          body: doctor,
        };
      },
      invalidatesTags: ["Doctor"],
    }),
  }),
});

// hooks export
export const { useGetAllDoctorsQuery, useAddDoctorMutation } = doctorApi;
