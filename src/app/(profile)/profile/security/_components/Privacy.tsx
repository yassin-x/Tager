"use client";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { Hash, Lock, LucideProps, Mail, ShieldCheck, User } from "lucide-react";
import React from "react";

export default function Privacy() {
  const actions: {
    title: string;
    description: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }[] = [
    {
      title: "Edit Password",
      icon: Lock,
      description: "change password to secure your account",
    },
    {
      title: "Change Email",
      icon: Mail,
      description: "change email to secure your account",
    },
    {
      title: "Change Username",
      icon: User,
      description: "change username to secure your account",
    },
    {
      title: "Change Phone Number",
      icon: Hash,
      description: "change phone number to secure your account",
    },
    {
      title: "Enable 2FA",
      icon: ShieldCheck,
      description: "enable 2FA to secure your account",
    },
  ];
  return (
    <section className="section-gap">
      <h2 className="text-2xl font-bold underline underline-offset-4">
        Privacy
      </h2>
      <div className="mt-4 space-y-4 container">
        {actions.map((action) => {
          return (
            <MagicCard
              key={action.title}
              className="p-4 rounded-md flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 max-w-md">
                <action.icon className="w-6 h-6 mt-1 shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{action.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {action.description}
                  </p>
                </div>
              </div>
              <Button variant={"destructive"}>{action.title}</Button>
            </MagicCard>
          );
        })}
      </div>
    </section>
  );
}
