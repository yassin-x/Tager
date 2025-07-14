import { User, UserRole } from "@prisma/client";
import { AuthOptions, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./actions/Auth";
import { Environments, Pages, Routes } from "@/constants/enums";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Partial<User> {
    id: string;
    index: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    country: string;
    bio?: string;
    verifiedUser: boolean;
    role: UserRole;
  }
}

export const NextAuthOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: {
          label: "Username or email",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await login(credentials);
        if (res.status === 200 && res.user) {
          return res.user;
        } else {
          throw new Error(
            JSON.stringify({
              validationError: res.error,
              responoseError: res.message,
            })
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 4 * 24 * 60 * 60, // 4 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === Environments.Dev,
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.index = token.index;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.phone = token.phone;
        session.user.country = token.country;
        session.user.bio = token.bio || null;
        session.user.verifiedUser = token.verifiedUser;
        session.user.role = token.role;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          index: token.index,
          firstName: token.firstName,
          lastName: token.lastName,
          username: token.username,
          email: token.email,
          phone: token.phone,
          country: token.country,
          bio: token.bio || null,
          verifiedUser: token.verifiedUser,
          role: token.role,
        },
      };
    },
    jwt: async ({ token }): Promise<JWT> => {
      const user = await db.user.findUnique({
        where: {
          email: token.email,
        },
      });
      if (!user) {
        return token;
      }
      return {
        id: user.id,
        index: user.index,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        country: user.country,
        bio: user.bio || undefined,
        verifiedUser: user.verifiedUser,
        role: user.role,
      };
    },
  },
  pages: {
    signIn: `/${Routes.Auth}/${Pages.Login}`,
    error: `/`,
  },
};
