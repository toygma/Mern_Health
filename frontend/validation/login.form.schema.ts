import z from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Invalid email address."),

  password: z
    .string({
      error: "Password is required.",
    })
    .min(6, "Password must be at least 6 characters."),
});

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;

export const SignUpFormSchema = z
  .object({
    name: z
      .string({
        error: "Name is required.",
      })
      .trim()
      .min(2, "Name must be at least 2 characters."),

    email: z.email("Invalid email address."),

    role: z.enum(["doctor", "patient"], {
      error: () => ({ message: "Role must be either doctor or patient." }),
    }),

    workingHours: z.array(
      z.object({
        dayOfWeek: z.number().min(0).max(6),
        isWorking: z.boolean(),
        startTime: z
          .string()
          .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time"),
        endTime: z
          .string()
          .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time"),
      })
    ),

    password: z
      .string({
        error: "Password is required.",
      })
      .min(6, "Password must be at least 6 characters."),

    confirmpassword: z
      .string({ error: "Confirm Password is required." })
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match.",
    path: ["confirmpassword"],
  });

export type TSignUpFormSchema = z.infer<typeof SignUpFormSchema>;
