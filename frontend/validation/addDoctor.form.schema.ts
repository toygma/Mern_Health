import z from "zod";

export const AddDoctorFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  speciality: z.string().min(1, "Speciality is required"),
  available: z.boolean(),
  role: z.enum(["doctor", "admin", "patient"]),
  images: z.array(z.string()).optional(),
  experience: z.number().optional(),
  about: z.string().optional(),
  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        institution: z.string().min(1, "Institution is required"),
        year: z.string().min(1, "Year is required"),
      })
    )
    .optional(),
  services: z.array(z.string()).optional(),
  hours: z.string().optional(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      district: z.string(),
      postalCode: z.string(),
      country: z.string(),
    })
    .optional(),
  phone: z.string().optional(),
  fee: z.number().optional(),
  patients: z.number().optional(),
  workingHours: z.array(
    z.object({
      dayOfWeek: z.number().min(0).max(6),
      isWorking: z.boolean(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ),
  awards: z.array(z.string()).optional(),
});

export type TAddDoctorFormSchema = z.infer<typeof AddDoctorFormSchema>;
