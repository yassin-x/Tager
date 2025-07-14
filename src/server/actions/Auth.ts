"use server";

import { db } from "@/lib/prisma";
import { loginSchema, registerSchema } from "@/validations/auth";
import bcrypt from "bcrypt";

export const login = async (
  credentials: Record<"password" | "username", string> | undefined
) => {
  const result = loginSchema().safeParse(credentials);
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }

  try {
    const user = await db.user.findFirst({
      where: {
        OR: [
          { username: result.data.username },
          { email: result.data.username },
        ],
      },
    });

    if (!user) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    const isPasswordValid = await bcrypt.compare(
      result.data.password,
      user.password
    );

    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Invalid password!",
      };
    }

    return {
      user: {
        ...user,
        password: undefined,
      },
      status: 200,
      message: "Login successful",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export const register = async (prevState: unknown, formData: FormData) => {
  const result = registerSchema().safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData,
      status: 400,
    };
  }

  try {
    const user = await db.user.findFirst({
      where: {
        OR: [{ username: result.data.username }, { email: result.data.email }],
      },
    });
    if (user) {
      return {
        status: 409,
        message: "Username or email already exists",
      };
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(result.data.password, salt);
    const code = Math.floor(100000 + Math.random() * 900000);

    const newUser = await db.user.create({
      data: {
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
        phone: result.data.phone,
        country: result.data.country,
        verificationCode: code.toString(),
        verificationExpire: new Date(Date.now() + 24 * 60 * 60 * 1000),
        verifiedUser: false,
      },
    });

    return {
      user: {
        ...newUser,
        password: undefined,
      },
      status: 201,
      message: "Registration successful",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
