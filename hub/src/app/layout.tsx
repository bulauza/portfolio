import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { config } from "@fortawesome/fontawesome-svg-core";
import { preconnect } from "react-dom";
import { EXTERNAL_LINKS } from "@/config/links";
import { GTM_ID } from "@/config/gtm";
import JsonLd from "@/components/JsonLd";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bulauza.com/"),
  title: {
    default: "Bulauza | LP制作・Web開発プロフェッショナル",
    template: "%s | Bulauza",
  },
  description:
    "Webエンジニア「Bulauza」のポートフォリオサイトです。プライム企業に在籍する現役エンジニアとして、保守性とスピードを両立した高品質なLP・Webサイト制作の実績をご紹介します。",
  keywords: ["LP制作", "Web開発", "Next.js", "React", "エンジニア", "ポートフォリオ"],
  authors: [{ name: "Bulauza" }],
  creator: "Bulauza",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Bulauza | LP制作・Web開発プロフェッショナル",
    description:
      "Webエンジニア「Bulauza」のポートフォリオサイトです。プライム企業に在籍する現役エンジニアとして、保守性とスピードを両立した高品質なLP・Webサイト制作の実績をご紹介します。",
    url: "/",
    siteName: "Bulauza Portfolio",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulauza | LP制作・Web開発プロフェッショナル",
    description:
      "Webエンジニア「Bulauza」のポートフォリオサイトです。プライム企業に在籍する現役エンジニアとして、保守性とスピードを両立した高品質なLP・Webサイト制作の実績をご紹介します。",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "https://zenn.dev/bulauza/feed",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   preconnect(EXTERNAL_LINKS.CLOUDWORKS);

  return (
    <html lang="ja">
      <GoogleTagManager gtmId={GTM_ID} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
