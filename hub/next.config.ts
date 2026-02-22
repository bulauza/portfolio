import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 末尾スラッシュを維持することで、Viteの base: '/works/lp-it-consult/' と整合させる。
  // これがないとNext.jsがスラッシュを削除し、Viteが警告ページを返してしまう。
  trailingSlash: true,
  async rewrites() {
    // 環境変数からベースURLを取得。設定がない場合はローカルのViteサーバー（5173）をフォールバックとして使用
    const baseUrl = process.env.WORKS_BASE_URL || "http://localhost:5173";

    return [
      {
        // /works/lp-it-consult/ のようなルートアクセスに対して、
        // Viteは自動でindex.htmlを返さないため明示的にマップする
        source: "/works/:projectName/",
        destination: `${baseUrl}/works/:projectName/index.html`,
      },
      {
        // その他のアセット（CSS, JS, 画像など）はそのまま転送
        source: "/works/:path*",
        destination: `${baseUrl}/works/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
