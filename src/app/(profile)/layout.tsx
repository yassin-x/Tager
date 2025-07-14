import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import SidebarMenuNav from "./_components/SidebarMenuNav";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "@/server/NextAuth";

export default async function layout({ children }: { children: React.ReactNode }) {
  const initialSession = await getServerSession(NextAuthOptions);
  return (
    <SidebarProvider>
      <SidebarMenuNav initialSession={initialSession} />
      <>
        <SidebarTrigger />
        {children}
      </>
    </SidebarProvider>
  );
}
