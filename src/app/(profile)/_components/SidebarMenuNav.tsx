"use client";

import React from "react";
import Link from "@/components/Link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown, ChevronUp, User2 } from "lucide-react";
import { useClientSession } from "@/hooks/useClientSession";
import { Pages, Routes } from "@/constants/enums";
import { usePathname } from "next/navigation";
import { UserRole } from "@prisma/client";

export default function SidebarMenuNav({
  initialSession,
}: {
  initialSession: Session | null;
}) {
  const { data } = useClientSession(initialSession);
  const pathname = usePathname();
  const links = [
    { name: "Profile", href: Routes.Profile },
    { name: "Orders", href: Pages.Orders },
    { name: "Security", href: Pages.Security },
  ];
  const sellerLinks = [
    {
      name: "My products",
      href: Pages.MyProducts,
    },
    {
      name: "Orders",
      href: Pages.Orders,
    },
  ];
  const adminLinks = [
    {
      name: "All users",
      href: Pages.AllUsers,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="font-bold text-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-red-500 to-yellow-500">
        Tager X
      </SidebarHeader>

      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Settings
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <CollapsibleContent>
              <SidebarGroupContent>
                {links.map((link) => (
                  <SidebarMenuButton
                    key={link.name}
                    isActive={
                      pathname === `/${Routes.Profile}`
                        ? pathname.startsWith(`/${link.href}`)
                        : pathname === `/${Routes.Profile}/${link.href}`
                    }
                  >
                    <Link
                      href={
                        link.href === Routes.Profile
                          ? `/${link.href}`
                          : `/${Routes.Profile}/${link.href}`
                      }
                    >
                      {link.name}
                    </Link>
                  </SidebarMenuButton>
                ))}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        {data?.user.role !== UserRole.Buyer && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Settings
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  {sellerLinks.map((link) => (
                    <SidebarMenuButton
                      key={link.name}
                      isActive={
                        pathname === `/${Routes.Profile}`
                          ? pathname.startsWith(`/${link.href}`)
                          : pathname === `/${Routes.Profile}/${link.href}`
                      }
                    >
                      <Link href={`/${Routes.Profile}/${link.href}`}>
                        {link.name}
                      </Link>
                    </SidebarMenuButton>
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {data?.user.role === UserRole.Admin && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Admin
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  {adminLinks.map((link) => (
                    <SidebarMenuButton
                      key={link.name}
                      isActive={
                        pathname === `/${Routes.Profile}`
                          ? pathname.startsWith(`/${link.href}`)
                          : pathname === `/${Routes.Profile}/${link.href}`
                      }
                    >
                      <Link href={`/${Routes.Profile}/${link.href}`}>
                        {link.name}
                      </Link>
                    </SidebarMenuButton>
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  {data?.user?.firstName} {data?.user?.lastName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
