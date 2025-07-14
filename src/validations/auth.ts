import * as z from "zod";

export const loginSchema = () => {
  return z.object({
    username: z
      .string()
      .min(3, { message: "Invalid username or email " })
      .refine((value) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isUsername = /^[a-z0-9_]+$/.test(value);
        return isEmail || isUsername;
      }),
    password: z
      .string()
      .min(6, { message: "Password is minimum 6 characters" })
      .max(12, { message: "Password is maximum 12 characters" }),
  });
};

export const registerSchema = () => {
  return z.object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    username: z
      .string()
      .trim()
      .regex(/^[a-z0-9_-]+$/, {
        message:
          "Username can only contain lowercase letters, numbers, hyphens, and underscores",
      }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password is minimum 6 characters" })
      .max(12, { message: "Password is maximum 12 characters" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    country: z.string().min(1, { message: "Country is required" }),
  });
};
