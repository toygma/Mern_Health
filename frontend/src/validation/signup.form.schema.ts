import { z } from "zod";

export const EducationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  year: z.string().min(4, "Year is required"),
});

export const WorkingHoursSchema = z.object({
  dayOfWeek: z.number(),
  isWorking: z.boolean(),
  startTime: z.string(),
  endTime: z.string(),
});

export const AddressSchema = z.object({
  street: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().min(1, "Country is required"),
});
const ServiceSchema = z.object({
  value: z.string(),
});
export const DoctorSignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().min(10, "Enter a valid phone number"),

  speciality: z.string().min(1, "Specialty is required"),
  experience: z.string().min(1, "Experience duration is required"),
  about: z.string().min(50, "Write at least 50 characters about yourself"),
  fee: z.number().min(0, "Fee must be greater than 0"),

  education: z
    .array(EducationSchema)
    .min(1, "Add at least one education entry"),

  services: z.array(ServiceSchema).min(1, "Add at least one service"),
  address: AddressSchema,

  appointmentDurationMinutes: z.number().min(15).max(120),
  workingHours: z.array(WorkingHoursSchema),

  role: z.literal("doctor"),
});

export type TDoctorSignUpSchema = z.infer<typeof DoctorSignUpSchema>;



export const PatientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.literal("patient"),
});

export type TPatientSignUpSchema = z.infer<typeof PatientSchema>;

