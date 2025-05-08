import "./globals.css";
import type { Metadata } from "next";
import { vazir } from "../lib/fonts";
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "فروشگاه چندفروشندگی",
  description:
    "سیستم فروشگاهی چندفروشندگی با Next.js، TypeScript، و Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" data-arp="" className={vazir.variable}>
      <body
        className={`${vazir.className} min-h-screen flex flex-col bg-gray-50`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
