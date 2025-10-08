import z from "zod";

export const LoginFormSchema = z
  .object({
    name: z
      .string({
        error: "Name is required.",
      })
      .trim()
      .min(2, "Name must be at least 2 characters."),

    email: z.email("Invalid email address."),

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

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;
