import Link from "@/components/Link";
import { buttonVariants } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { Pages, Routes } from "@/constants/enums";
import { cn } from "@/lib/utils";
import React from "react";
import Form from "./_components/Form";

export default function page() {
  return (
    <main className="">
      <section className="container element-center h-screen">
        <MagicCard className="mx-auto w-full max-w-md p-2 rounded-md space-y-4">
          <h2 className="text-2xl font-bold text-primary text-center">
            Register
          </h2>
          <Form />
          <div className="my-4 flex items-center flex-row gap-2 justify-center">
            <p className="text-muted-foreground text-sm">
              You have an account?
            </p>
            <Link
              href={`/${Routes.Auth}/${Pages.Login}`}
              className={cn(buttonVariants({ variant: "link" }), "p-0!")}
            >
              Login
            </Link>
          </div>
        </MagicCard>
      </section>
    </main>
  );
}
