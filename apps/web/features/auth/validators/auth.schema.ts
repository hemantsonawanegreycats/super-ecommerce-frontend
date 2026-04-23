import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters.").regex(/[A-Z]/, "Must contain at least one uppercase letter.").regex(/[0-9]/, "Must contain at least one number."),
  role: z.enum(["CUSTOMER", "VENDOR"]).default("CUSTOMER"),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
