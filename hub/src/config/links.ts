/**
 * 外部リンクやコンタクト用の一括管理ファイル
 */

export const EXTERNAL_LINKS = {
  // クラウドワークス 公開ページ
  CLOUDWORKS: "https://crowdworks.jp/public/employees/6462055",
  // GitHub プロフィール
  GITHUB: "https://github.com/bulauza",
  // Zenn プロフィール
  ZENN: "https://zenn.dev/bulauza",
} as const;

export type ExternalLinkKey = keyof typeof EXTERNAL_LINKS;
