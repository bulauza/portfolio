import { EXTERNAL_LINKS } from "@/config/links";

/**
 * SEO/AIEO 向けの構造化データ (JSON-LD) を生成するコンポーネント
 */
export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bulauza",
    url: "https://bulauza.com/",
    image: "https://bulauza.com/images/self_portrait.jpeg",
    sameAs: [EXTERNAL_LINKS.GITHUB, EXTERNAL_LINKS.ZENN, EXTERNAL_LINKS.CLOUDWORKS],
    jobTitle: "Software Engineer",
    description: "プライム企業在籍の現役エンジニア。LP制作やWeb開発のプロフェッショナル。",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Tokyo",
      addressCountry: "JP",
    },
    knowsLanguage: ["Japanese", "English"],
    knowsAbout: ["Web Development", "Next.js", "React", "TypeScript", "UI/UX Design"],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Bulauza Web Development",
    image: "https://bulauza.com/images/self_portrait.jpeg",
    description: "高品質なLP制作・Webサイト開発サービス。保守性とスピードを両立した実装を提供します。",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Tokyo",
      addressCountry: "JP",
    },
    priceRange: "$$",
    areaServed: "JP",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
