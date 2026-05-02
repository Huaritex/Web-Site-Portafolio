import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Huaritex — Cybersecurity & AI Developer",
  description:
    "Full-stack developer and cybersecurity enthusiast specializing in AI-applied security, Python, TypeScript, and modern web development.",
  keywords: ["cybersecurity", "AI", "developer", "portfolio", "Python", "TypeScript"],
  openGraph: {
    title: "Huaritex — Cybersecurity & AI Developer",
    description: "Full-stack developer and cybersecurity enthusiast.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
