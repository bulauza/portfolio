import { MetadataRoute } from "next";
import works from "@/data/works.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bulauza.com";

  // 実績ページのURLを生成
  const worksUrls = works.map((work) => ({
    url: `${baseUrl}${work.links.demo}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...worksUrls,
  ];
}
