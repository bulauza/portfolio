import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // AI クローラー向けの明示的な許可設定
        userAgent: ["GPTBot", "ChatGPT-User", "Claude-Bot", "OAI-SearchBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: "https://bulauza.com/sitemap.xml",
  };
}
