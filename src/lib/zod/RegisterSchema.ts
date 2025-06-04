import { z } from "zod";

export const signupSchema = z.object({
  // country: z.string().min(1, "Country is required"),
  email: z.string().email("Invalid email address"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  mobile: z
    .string()
    .min(10, "Mobile number is too short")
    .max(10, "Mobile number is too long")
    .regex(/^\d+$/, "Only digits allowed"),
  // countryCode: z.string().min(1, "Select country code"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
  // agreeToTerms: z.boolean().refine((val) => val === true, {
  //   message: "You must agree to the terms",
  // }),
  // receiveUpdates: z.boolean(),
});

export type SignupFormData = z.infer<typeof signupSchema>;
