"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Session } from "next-auth";
import React, { useActionState, useRef, useState } from "react";
import { editBio } from "../_actions/profile";
import { initialState } from "@/types/app";

export default function BioEdit({ data }: { data: Session | null }) {
  const [bio, setBio] = useState(data?.user.bio || "");
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [state, action, pending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      if (data?.user?.username) {
        formData.set("username", data.user.username);
      }
      setIsReadOnly(true);
      return await editBio(prevState, formData);
    },
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form className="flex flex-col gap-2" action={action} ref={formRef}>
      <Textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        maxLength={500}
        className="resize-none h-32 focus-visible:ring-0 focus-visible:border-border"
        placeholder="Write your bio..."
        readOnly={isReadOnly}
        name="bio"
      />
      {state?.error && state?.error["bio"] && (
        <p className="text-destructive mt-2 text-sm font-medium">
          {state.error["bio"]}
        </p>
      )}
      <div className="flex items-center justify-between">
        <Button
          variant={isReadOnly ? "destructive" : "default"}
          onClick={(e) => {
            if (isReadOnly) {
              e.preventDefault();
              setIsReadOnly(false);
            }
          }}
          type={isReadOnly ? "button" : "submit"}
          disabled={pending}
        >
          {isReadOnly ? "Edit" : "Save"}
        </Button>
        <span className="text-sm text-muted-foreground text-right">
          {bio.length} / 500
        </span>
      </div>
    </form>
  );
}
