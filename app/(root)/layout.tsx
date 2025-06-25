import type { Metadata } from "next";

import { Header } from "@/components/shared";

import React from "react";

export const metadata: Metadata = {
  title: "Fake Pizza | Главная",
  description: "Самая лучшая несущестующая пицца в мире!",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>
        {children}
        {modal}
      </main>
    </>
  );
}
