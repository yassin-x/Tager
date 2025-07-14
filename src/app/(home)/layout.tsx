import Header from "@/components/Header";
import { NextAuthOptions } from "@/server/NextAuth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialSession = await getServerSession(NextAuthOptions);
  return (
    <>
      <Header initialSession={initialSession} />
      {children}
    </>
  );
}
