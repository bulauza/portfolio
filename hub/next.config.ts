import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.jsのデフォルトのルーティング挙動に任せる
  async rewrites() {
    // 環境変数からベースURLを取得。設定がない場合はローカルのViteサーバー（5173）をフォールバックとして使用
    const baseUrl = process.env.WORKS_BASE_URL || "http://localhost:5173";

    // 本番環境（Vercel）ではvercel.jsonのEdgeルーティングに任せるため、
    // localhost以外の場合はNext.js側のプロキシを無効化する
    if (!baseUrl.includes("localhost")) {
      return [];
    }

    return [
      {
        // /works/lp-it-consult（末尾スラッシュなし）へのアクセスをローカルでindex.htmlへプロキシ
        source: "/works/:projectName",
        destination: `${baseUrl}/works/:projectName/index.html`,
      },
      {
        // /works/lp-it-consult/（末尾スラッシュあり）へのアクセスをローカルでindex.htmlへプロキシ
        source: "/works/:projectName/",
        destination: `${baseUrl}/works/:projectName/index.html`,
      },
      {
        // その他のアセット（CSS, JS, 画像など）や本番環境のルート遷移はそのまま転送
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
