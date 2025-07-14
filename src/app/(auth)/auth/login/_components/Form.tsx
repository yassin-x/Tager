"use client";
import FormFields from "@/components/FormFields";
import { Button } from "@/components/ui/button";
import { FormPagesType, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { LoaderIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useRef, useState } from "react";
import { toast } from "sonner";

export default function Form() {
  const { getFormFields } = useFormFields({
    slug: FormPagesType.Login,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsLoading(true);
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationError;
        setError(validationError);
        const responseError = JSON.parse(res?.error).responoseError;
        if (responseError) {
          toast(responseError, { className: "text-red-400" });
        }
      }

      if (res?.ok) {
        toast("Signin successfully", { className: "text-green-400" });
        router.replace(`/${Routes.Profile}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="space-y-4" ref={formRef} onSubmit={onSubmit}>
      {getFormFields().map((field: IFormField) => (
        <Fragment key={field.name}>
          <FormFields {...field} error={error} />
        </Fragment>
      ))}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? <LoaderIcon className="animate-spin w-4 h-4" /> : "Signin"}
      </Button>
    </form>
  );
}
