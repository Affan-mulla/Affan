import { MetadataRoute } from "next";
import { caseStudyPages } from "./components/portfolio-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://byaffan.com/"; 

  const caseStudyRoutes = caseStudyPages.map((study) => ({
    url: `${baseUrl}/work/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...caseStudyRoutes,
  ];
}
