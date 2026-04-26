import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { PageTransition } from "@/app/components/PageTransition";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Affan Mulla | Freelance Product Designer",
    template: "%s | Affan Mulla",
  },
  description:
    "Portfolio of Affan Mulla, freelance product designer and front-end developer creating SEO-optimized, mobile-first websites with interactive motion.",
  keywords: [
    "Affan Mulla",
    "freelance portfolio",
    "product designer",
    "frontend developer",
    "instagram aff4n_7",
    "x _aff4n_",
    "seo portfolio website",
  ],
  alternates: {
    canonical: "https://affanmulla.com",
  },
  openGraph: {
    title: "Affan Mulla | Freelance Product Designer",
    description:
      "SEO-focused, conversion-driven portfolio website by Affan Mulla for clients and collaborations.",
    url: "https://affanmulla.com",
    siteName: "Affan Mulla Portfolio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Affan Mulla" }],
  twitter: {
    card: "summary_large_image",
    title: "Affan Mulla | Freelance Product Designer",
    description: "Interactive portfolio focused on client leads, SEO, and polished UI motion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
