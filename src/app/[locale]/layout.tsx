import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Metadata } from "next";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://CPD.com/"),
  title: "CPD",
  description:
    "Buy, Sell, CPD - The Win-Win Marketplace. CPD offers a thrilling experience: list in 30 seconds, explore new arrivals daily, and connect with buyers and sellers in a secure community. Build your reputation, find hidden gems, and join millions of users shopping locally!",
  keywords: [
    "CPD",
    "Marketplace",
    "Buy and Sell",
    "Local Shopping",
    "Online Deals",
    "List Fast",
    "Community Marketplace",
  ],
  authors: [{ name: "CPD", url: "https://CPD.com" }],
  robots: "index, follow",
  openGraph: {
    title: "CPD",
    description:
      "Buy, Sell, CPD - The Win-Win Marketplace. CPD offers a thrilling experience: list in 30 seconds, explore new arrivals daily, and connect with buyers and sellers in a secure community. Build your reputation, find hidden gems, and join millions of users shopping locally!",
    url: "https://CPD.com/",
    type: "website",
    images: [
      {
        url: "/branding/store.png",
        width: 800,
        height: 600,
        alt: "CPD Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CPD",
    description:
      "Buy, Sell, CPD - The Win-Win Marketplace. CPD offers a thrilling experience: list in 30 seconds, explore new arrivals daily, and connect with buyers and sellers in a secure community.",
    images: ["/branding/store.png"],
  },
  icons: {
    icon: "/branding/fav.svg",
    apple: "/branding/fav.svg",
  },
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
const messages = await getMessages()

  return (
    <html lang={locale} dir={locale ==='ar' ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>

        {children}

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
