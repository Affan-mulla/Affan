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
    "freelance web designer",
    "web design for cafes",
    "contractor website design",
    "service business web design",
    "Full stack web developer",
    "Frontend developer",
    "Best web designer for local businesses",
    "SEO for local businesses",
    "Web design for small businesses",
    "Web design for restaurants",
    "Web design for contractors",
    "Web design for service businesses",
    "Website design and SEO for local businesses",
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
      <head>
        <meta name="google-site-verification" content="r7rZfyi6SFH_2zJPfND71jXWkkUH1RPze9pMg1jhStE" />
        <meta name="google-site-verification" content="Ky0qIfMeU_mpTMGdF8bKz7vGIeDj81FfpP7BXZhB9kY" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Affan Mulla",
              jobTitle: "Web Designer & Developer",
              description:
                "Building websites and landing pages for local businesses internationally.",
              email: "mailto:affanmulla077@gmail.com",
              url: "https://affan-mulla.vercel.app",
              sameAs: [
                "https://instagram.com/aff4n_7",
                "https://x.com/_aff4n_",
                "https://www.linkedin.com/in/affan-mulla-544341321/",
                "https://github.com/affanmulla",
              ],
              knowsAbout: [
                "Website Design",
                "Local SEO",
                "Landing Pages",
                "Next.js",
                "Small Business Websites",
                "E-commerce",
              ],
              areaServed: ["IN", "GB", "US", "CA", "AE", "AU"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Affan Mulla Portfolio",
              description:
                "Portfolio website for Affan Mulla, freelance designer and front-end developer.",
              url: "https://affan-mulla.vercel.app",
              sameAs: [
                "https://instagram.com/aff4n_7",
                "https://x.com/_aff4n_",
                "https://www.linkedin.com/in/affan-mulla-544341321/",
              ],
              knowsAbout: [
                "Website Design",
                "Local SEO",
                "Landing Pages",
                "Next.js",
                "Small Business Websites",
                "E-commerce",
              ],
              areaServed: ["IN", "GB", "US", "CA", "AE", "AU"],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
