import { NextAuthOptions } from "@/server/NextAuth";
import { getServerSession } from "next-auth";
import React from "react";
import Details from "./_components/Details";

export default async function page() {
  const initialSession = await getServerSession(NextAuthOptions)
  return <main className="w-full">
    <Details initialSession={initialSession} />
  </main>;
}
