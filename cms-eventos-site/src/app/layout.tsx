// src/app/layout.tsx
import { ReactNode } from "react";
import NavBar from "../components/Navbar"; // Caminho do seu NavBar
import Footer from "../components/Footer"; // Caminho do seu Footer
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar /> {/* Adicionando o NavBar aqui */}
        <div className="min-h-screen">{children}</div> {/* Conteúdo da página */}
        <Footer /> {/* Adicionando o Footer aqui */}
      </body>
    </html>
  );
}
