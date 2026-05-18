import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TravelDream — Турагентство | Туры по всему миру",
  description: "TravelDream — вашемурагентство. Более 500 направлений, индивидуальный подход, лучшие цены. Бали, Мальдивы, Париж, Токио и другие.",
  keywords: ["туры", "турагентство", "путешествия", "Бали", "Мальдивы", "Париж", "отдых", "бронирование туров"],
  authors: [{ name: "TravelDream" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "TravelDream — Турагентство",
    description: "Откройте мир путешествий мечты. 500+ направлений по всему миру.",
    type: "website",
    siteName: "TravelDream",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
