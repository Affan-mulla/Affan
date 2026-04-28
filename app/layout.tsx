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
    default: "Affan Mulla | Websites for Local Businesses",
    template: "%s | Affan Mulla",
  },
  description:
    "I build professional websites, landing pages, and local SEO for cafes, restaurants, contractors, and service businesses worldwide. Based in Gujarat, working internationally.",
  keywords: [
    "website designer for local business",
    "small business website design",
    "restaurant website design",
    "local SEO service",
    "landing page designer",
    "affordable website design",
    "Next.js developer",
    "Affan Mulla",
  ],
  alternates: {
    canonical: "https://affan-mulla.vercel.app",
  },
  openGraph: {
    title: "Affan Mulla | Websites for Local Businesses",
    description:
      "Professional websites and local SEO for cafes, restaurants, contractors, and service businesses. Fast delivery, honest pricing.",
    url: "https://affan-mulla.vercel.app",
    siteName: "Affan Mulla",
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
