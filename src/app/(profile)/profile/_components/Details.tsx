"use client";
import { useClientSession } from "@/hooks/useClientSession";
import { User2 } from "lucide-react";
import { Session } from "next-auth";
import React from "react";
import BioEdit from "./BioEdit";

export default function Details({
  initialSession,
}: {
  initialSession: Session | null;
}) {
  const { data } = useClientSession(initialSession);

  return (
    <section className="section-gap container">
      <div className="flex items-center justify-around gap-4 md:gap-6 flex-col md:flex-row">
        <div className="flex justify-center">
          <div className="rounded-full p-4 border border-border">
            <User2 className="w-32 h-32" />
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-md w-full">
          <div>
            <h2 className="font-semibold text-2xl">
              {data?.user.firstName} {data?.user.lastName}
            </h2>
            <div className="space-y-3 mt-3">
              <p className="text-muted-foreground text-sm">
                <span className="text-primary">Username : </span>
                {data?.user.username}
              </p>
              <p className="text-muted-foreground text-sm">
                <span className="text-primary">Email : </span>
                {data?.user.email}
              </p>
            </div>
          </div>
          <BioEdit data={data} />
        </div>
      </div>
    </section>
  );
}
