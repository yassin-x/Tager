"use server";

import { db } from "@/lib/prisma";
import { profileBioSchema } from "@/validations/profile";

export const editBio = async (prevState: unknown, formData: FormData) => {
  const result = (await profileBioSchema()).safeParse(
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
    const user = await db.user.findUnique({
      where: {
        username: result.data.username,
      },
    });

    if (!user) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    const updateBio = await db.user.update({
      where: {
        username: result.data.username,
      },
      data: {
        bio: result.data.bio ?? "",
      },
    });

    return {
      status: 200,
      message: "Bio updated successfully",
      user: {
        ...updateBio,
        password: undefined
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
