import z from "zod";

export const UpdateFormSchema = z.object({
  name: z
    .string({ error: "Name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters."),

  email: z.email("Invalid email address."),

  image: z.union([z.url(), z.string()]).optional().or(z.literal("")),

  phone: z
    .string({ error: "Phone is required." })
    .min(6, "Phone must be at least 6 characters."),

  gender: z.enum(["Male", "Female"], { error: "Gender is required." }),

  dob: z.string({ error: "Date of birth is required." }),

  address: z.object({
    line1: z.string({ error: "Address line1 is required." }),
    line2: z.string().optional(),
  }),
});

export type TUpdateFormSchema = z.infer<typeof UpdateFormSchema>;
