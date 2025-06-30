"use client";
import { Theme } from "@/constants/enums";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function NextThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      themes={[Theme.Light, Theme.Dark]}
      enableSystem={false}
      defaultTheme={Theme.Dark}
    >
      {children}
    </ThemeProvider>
  );
}
