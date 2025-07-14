"use client";

import FormFields from "@/components/FormFields";
import { Button } from "@/components/ui/button";
import { FormPagesType, Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { register } from "@/server/actions/Auth";
import { IFormField, initialState } from "@/types/app";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Fragment, useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function Form() {
  const { getFormFields } = useFormFields({
    slug: FormPagesType.Register,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(register, initialState);
  const router = useRouter();
  useEffect(() => {
    if (state.status === 201) {
      toast(state.message, { className: "text-green-400" });
      router.push(`/${Routes.Auth}/${Pages.Login}`);
    } else {
      toast(state.message, { className: "text-red-400" });
    }
  }, [state.message, state.status, router]);

  return (
    <form className="space-y-4" ref={formRef} action={action}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getFormFields().map((field: IFormField) => {
          const fieldValue = state.formData?.get(field.name) as string;
          return (
            <Fragment key={field.name}>
              <FormFields
                {...field}
                error={state.error}
                defaultValue={fieldValue}
              />
            </Fragment>
          );
        })}
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? <LoaderIcon className="animate-spin w-4 h-4" /> : "Signin"}
      </Button>
    </form>
  );
}
