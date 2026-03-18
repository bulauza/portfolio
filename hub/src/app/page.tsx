import { getImageProps } from "next/image";
import Link from "next/link";
import works from "@/data/works.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faFingerprint,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

type ThemedWorkImageProps = {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  isPriority: boolean;
};

/**
 * OSのカラースキーム（prefers-color-scheme）に応じて、
 * 対応するテーマの画像1枚だけをブラウザにダウンロードさせるコンポーネント。
 * picture + source[media] によりブラウザ側で最適な1枚を選択する。
 * Server Component のまま動作するため、クライアントバンドルに影響しない。
 */
function ThemedWorkImage({
  darkSrc,
  lightSrc,
  alt,
  isPriority,
}: ThemedWorkImageProps) {
  const sharedConfig = {
    alt,
    fill: true,
    // グリッドが md:grid-cols-2 なのでモバイルは100vw、デスクトップは50vw相当
    sizes: "(max-width: 768px) 100vw, 50vw",
    priority: isPriority,
    className:
      "object-cover group-hover:scale-[1.02] transition-transform duration-700",
  };

  const { props: darkProps } = getImageProps({ src: darkSrc, ...sharedConfig });
  const { props: lightProps } = getImageProps({
    src: lightSrc,
    ...sharedConfig,
  });

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={darkProps.srcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- props に alt が含まれている */}
      <img {...lightProps} />
    </picture>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-xl tracking-tight hover:opacity-70 transition-opacity"
          >
            Bulauza's Portfolio
          </Link>
          <div className="flex gap-8 text-sm font-medium items-center">
            <Link
              href="#about"
              className="hover:text-[var(--accent)] transition-colors"
            >
              About
            </Link>
            <Link
              href="#works"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Works
            </Link>
            <Link
              href="mailto:your-email@example.com"
              className="px-5 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-full hover:opacity-90 transition-all font-semibold"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <section id="about" className="mb-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
              LP・Webサイト制作を <br />
              <span className="text-[var(--accent)]">
                確かな「開発力」で支えます
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-10">
              「作りたい」の背景にあるビジネスの課題を、
              <br className="hidden md:block" />
              確かな設計と最適な技術で解決へ導きます。
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="bento-grid mt-16">
            {/* Mission Statement */}
            <div className="bento-card col-span-2 row-span-2 group">
              <div>
                <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-4 block">
                  制作への想い
                </span>
                <h2 className="text-3xl font-bold mb-6">
                  長く　深く
                  <br />
                  寄り添うエンジニアリング
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  「作って終わり」にせず、数年先も「頼んでよかった」と思える価値を提供し続けます。
                  当たり前のことを、当たり前に、そして高い精度で。
                  公開後の運用まで見据えた「使い心地の良さ」と「安心感」を、確かな技術で支えることが私のエンジニアリングです。
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-[var(--card-border)]">
                <div className="flex flex-wrap gap-2">
                  {["安定性", "効率性", "成長支援"].map((val) => (
                    <span
                      key={val}
                      className="text-xs font-medium px-3 py-1 bg-[var(--accent-muted)] text-[var(--accent)] rounded-md"
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack/Focus Card */}
            <div className="bento-card col-span-2 group">
              <div>
                <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-4 block">
                  こだわり
                </span>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      label: "表示の高速化",
                      desc: "適切なコード整理と軽量化",
                      icon: faBolt,
                    },
                    {
                      label: "直感的なUI",
                      desc: "ユーザーを迷わせない操作感",
                      icon: faFingerprint,
                    },
                    {
                      label: "運用のしやすさ",
                      desc: "納品後の更新を考慮した設計",
                      icon: faTools,
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <FontAwesomeIcon icon={item.icon} className="w-5" />
                      <div>
                        <h4 className="text-lg font-boldfont-bold text-sm text-white">
                          {item.label}
                        </h4>
                        <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Background */}
            <div className="bento-card col-span-2 group">
              <div>
                <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-4 block">
                  開発スタンス
                </span>
                <h3 className="text-xl font-bold mb-2 text-slate-600 dark:text-slate-400">
                  Software Engineer
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  システムエンジニアとして、SaaSや基幹システムの構築に携わってきました。
                  その経験から得た「変化に強い設計」を活かし、作って終わりの制作ではなく、
                  お客様と共に育っていくサイト作りを目指しています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section id="works" className="mt-40">
          <div className="flex justify-between items-end mb-16 border-b border-[var(--card-border)] pb-8">
            <div>
              <h2 className="text-4xl font-bold tracking-tight">
                Typical Works
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {works.map((work, index) => (
              <Link
                key={work.id}
                href={work.links?.demo || "#"}
                target="_blank"
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-8 bg-[var(--card-bg)] border border-[var(--card-border)] shadow-sm hover:shadow-xl transition-all duration-500">
                  {work.imageDark && work.imageLight && (
                    <ThemedWorkImage
                      darkSrc={work.imageDark}
                      lightSrc={work.imageLight}
                      alt={work.title}
                      // 先頭の作品画像は LCP の対象になるため優先ロード
                      isPriority={index === 0}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--background)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex justify-between items-start">
                  <div className="max-w-md">
                    <div className="flex gap-2 mb-3">
                      {work.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold tracking-widest text-slate-600 border border-slate-300 dark:text-slate-400 dark:border-slate-700 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-[var(--accent)] transition-colors mb-4">
                      {work.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {work.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-[var(--card-border)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all flex-shrink-0">
                    <svg
                      className="w-6 h-6 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-20 text-center border-t border-[var(--card-border)] bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            © 2026 Bulauza.
          </p>
          <div className="flex gap-10">
            {[
              {
                name: "GitHub",
                url: "https://github.com/bulauza",
              },
              {
                name: "Zenn",
                url: "https://zenn.dev/bulauza",
              },
            ].map((platform) => (
              <Link
                key={platform.name}
                href={platform.url}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-[var(--foreground)] transition-colors font-semibold"
              >
                {platform.name}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
