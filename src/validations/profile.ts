import * as z from "zod";

export const profileBioSchema = async () => {
  return z.object({
    username: z.string().min(1, { message: "Username is required" }),
    bio: z.string().max(500, { message: "Bio is maximum 500 characters" }),
  });
};
