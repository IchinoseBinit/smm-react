import { z } from "zod";

const signupSchema = z
  .object({
    // country: z.string().min(1, "Country is required"),
    email: z.string().email("Invalid email address"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),

    mobile: z.union([
      z.literal(""),
      z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits")
    ]).optional(),

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
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    // agreeToTerms: z.boolean().refine((val) => val === true, {
    //   message: "You must agree to the terms",
    // }),
    // receiveUpdates: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const sendOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const verifyOtpSchema = z.object({
  otp: z
    .array(z.string().min(1), { required_error: "Pin is required" })
    .length(6, { message: "Pin must be 6 digits long" }),
});

const resetPswSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    otp: z
      .string()
      .min(6, { message: "Pin must be 6 digits long" })
      .max(6, { message: "Pin must be 6 digits long" })
      .regex(/^\d{6}$/, { message: "Pin must contain only digits" }),
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
    confirmpassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords do not match",
  });

// Separate schemas for two-step reset process
const resetOtpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Pin must be 6 digits long" })
    .max(6, { message: "Pin must be 6 digits long" })
    .regex(/^\d{6}$/, { message: "Pin must contain only digits" }),
});

const resetPasswordSchema = z
  .object({
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
    confirmpassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords do not match",
  });

export type SignupFormData = z.infer<typeof signupSchema>;
export type SendOtpFormData = z.infer<typeof sendOtpSchema>;
export type ResetPswFormData = z.infer<typeof resetPswSchema>;
export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;
export type ResetOtpFormData = z.infer<typeof resetOtpSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export {
  sendOtpSchema,
  signupSchema,
  resetPswSchema,
  verifyOtpSchema,
  resetOtpSchema,
  resetPasswordSchema
};