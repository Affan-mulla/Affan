import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudyPages } from "@/app/components/portfolio-data";
import { CaseStudyLayout } from "./CaseStudyLayout";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudyPages.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyPages.find((s) => s.slug === slug);
  if (!study) return { title: "Not Found" };

  return {
    title: study.title,
    description: study.description,
    openGraph: {
      title: study.title,
      description: study.description,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudyPages.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyLayout study={study} />;
}
