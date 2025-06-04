import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fake pizza |",
  description: "",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
