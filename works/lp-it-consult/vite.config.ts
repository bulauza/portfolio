import { defineConfig } from "vite";

export default defineConfig({
  // Next.jsのリライト経由でアクセスされるため、ViteのベースURLをパスに合わせる
  base: "/works/lp-it-consult/",
  server: {
    // 競合時の自動ポートずれを防ぐため、ポートを固定する
    port: 5173,
    strictPort: true, // 5173が使用中の場合エラーで停止（サイレントなポートずれを防止）
  },
});
