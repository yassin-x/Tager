import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NextThemeProvider from "@/providers/NextThemeProvider";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Tager Shater",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <NextAuthSessionProvider>
          <NextThemeProvider>{children}</NextThemeProvider>
          <Toaster position="top-center" />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
