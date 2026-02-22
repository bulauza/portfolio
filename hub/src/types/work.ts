// works.json の各エントリの型定義
// worksの追加は works.json のみで完結するよう、スキーマを一元管理する
export type WorkCategory =
  | "SaaS / Web App"
  | "LP / Corporate Site"
  | "WordPress"
  | "Static HTML"
  | "Other";

export type Work = {
  id: string;
  title: string;
  category: WorkCategory;
  description: string;
  // 担当領域（例: "Design / Front-end"）
  role: string;
  // 制作年月（例: "2025.12"）
  period: string;
  // サムネイル画像パス（public/images/works/{id}.png を推奨）
  thumbnail: string;
  // トップに固定するか
  featured: boolean;
  links: {
    // worksサブディレクトリへのパス。nullの場合はデモなし
    demo: string | null;
    // GitHub URL。nullの場合は非表示
    source: string | null;
  };
  tags: string[];
};
