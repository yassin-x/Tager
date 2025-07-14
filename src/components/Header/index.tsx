"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Link from "../Link";
import { Pages, Routes } from "@/constants/enums";
import { buttonVariants } from "../ui/button";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";
import Auth from "./Auth";

export default function Header({
  initialSession,
}: {
  initialSession: Session | null;
}) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);
  const { data } = useClientSession(initialSession);
  console.log(data);
  return (
    <header
      className={cn(
        "py-4 sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ease-in-out",
        scrollY > 50 ? "bg-popover rounded-b-xl shadow-md" : "bg-transparent"
      )}
    >
      <div className="container flex justify-between items-center gap-4 md:gap-6">
        <div className="flex flex-row items-center gap-4 w-full">
          <Link
            href={Routes.Root}
            className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-red-500 to-yellow-500"
          >
            Tager
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={`/${Routes.Auth}/${Pages.Login}`}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Become a Seller
          </Link>
          {data?.user ? (
            <Auth data={data} />
          ) : (
            <Link
              href={`/${Routes.Auth}/${Pages.Login}`}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
