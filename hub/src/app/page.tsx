import Image, { getImageProps } from "next/image";
import Link from "next/link";
import works from "@/data/works.json";
import { EXTERNAL_LINKS } from "@/config/links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faFingerprint,
  faTools,
  faChevronRight,
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-card-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-xl tracking-tight hover:opacity-70 transition-opacity"
          >
            Bulauza's Portfolio
          </Link>
          <div className="flex gap-8 text-sm font-medium items-center">
            <Link href="#about" className="hover:text-accent transition-colors">
              About
            </Link>
            <Link href="#works" className="hover:text-accent transition-colors">
              Works
            </Link>
            <Link
              href={EXTERNAL_LINKS.CLOUDWORKS}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-foreground text-background rounded-full hover:opacity-90 transition-all font-semibold"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <section id="mission" className="mb-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-balance break-phrase">
              LP・Webサイト制作を
              <br className="md:hidden" />
              <span className="text-accent">確かな「開発力」で支えます</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-10 text-pretty break-phrase">
              LP・Webサイトは公開してからが本当の勝負。
              <br />
              A/Bテストや改善を高速化する、保守性の高い実装をご提供します。
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="bento-grid mt-16">
            {/* Mission Statement */}
            <div className="bento-card col-span-2 row-span-2 group">
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-widest mb-4 block">
                  制作への想い
                </span>
                <h2 className="text-3xl font-bold mb-6 text-balance break-phrase">
                  長く・深く
                  <br />
                  寄り添うエンジニアリング
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-pretty break-phrase">
                  「作って終わり」にせず、数年先も「頼んでよかった」と思える価値を。
                  <br />
                  見た目が綺麗なのは当たり前。
                  1箇所の文言変更でレイアウトが崩れたり、複雑すぎて誰も触れなくなる「使い捨てのサイト」は作りません。
                  公開後の運用まで見据えた「使い心地の良さ」と「安心感」を、確かな技術で支えることが私のエンジニアリングです。
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-card-border">
                <div className="flex flex-wrap gap-2">
                  {["安定性", "効率性", "成長支援"].map((val) => (
                    <span
                      key={val}
                      className="text-xs font-medium px-3 py-1 bg-accent-muted text-accent rounded-md"
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
                <span className="text-xs font-bold text-accent uppercase tracking-widest mb-4 block">
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
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-accent w-5"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-foreground break-phrase">
                          {item.label}
                        </h3>
                        <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase block text-pretty break-phrase">
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
                <span className="text-xs font-bold text-accent uppercase tracking-widest mb-4 block">
                  開発スタンス
                </span>
                <h3 className="text-xl font-bold mb-2 text-foreground break-phrase">
                  デザインを機能として捉える
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 text-pretty break-phrase">
                  ピクセル単位の再現（ピクセルパーフェクト）よりも、あらゆる画面幅での「崩れにくさ」と、ユーザーが迷わない「レスポンス」を優先します。
                  実装上の制約や、より良いUXのアイデアは積極的に代替案を提示します。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section id="works" className="mt-40">
          <div className="flex justify-between items-end mb-16 border-b border-card-border pb-8">
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
                <div className="relative aspect-16/10 overflow-hidden rounded-3xl mb-8 bg-card-bg border border-card-border shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  {work.imageDark && work.imageLight && (
                    <ThemedWorkImage
                      darkSrc={work.imageDark}
                      lightSrc={work.imageLight}
                      alt={work.title}
                      // 先頭の作品画像は LCP の対象になるため優先ロード
                      isPriority={index === 0}
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-tr from-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors mb-4 text-balance break-phrase">
                      {work.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed text-pretty break-phrase">
                      {work.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-card-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all shrink-0">
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

        {/* About */}
        <section id="about" className="mt-48 mb-32 scroll-mt-24">
          <div className="relative p-10 md:p-16 rounded-[2.5rem] overflow-hidden bg-card-bg/50 backdrop-blur-2xl border border-card-border shadow-sm transition-all duration-700 group hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/30 hover:-translate-y-1">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] group-hover:bg-accent/20 transition-colors duration-700"></div>
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-accent/5 rounded-full blur-[80px]"></div>

            <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
              <div className="shrink-0">
                <div className="w-32 h-32 rounded-3xl bg-linear-to-br from-accent to-accent/60 flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:shadow-accent/30 overflow-hidden relative border border-card-border">
                  <Image
                    src="/images/hoge.png"
                    alt="Self-portrait"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full transition-all duration-700 group-hover:scale-115 group-hover:-translate-y-2 opacity-90 group-hover:opacity-100"
                  />
                </div>
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-accent tracking-[0.2em] uppercase mb-4 block opacity-80">
                  ABOUT ME
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-foreground break-phrase">
                  エンジニア / <span className="text-accent">Bulauza</span>
                </h2>
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-foreground opacity-90 break-phrase line-relaxed">
                  「1年後の自分が、一番使いやすいコードを。」
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 text-lg md:text-xl text-pretty break-phrase">
                  システム開発の現場で培った「保守性への執着」をWeb制作に注ぎます。納品された時は完璧でも、少し修正しただけでレイアウトが崩れたり、表示が遅くなったりするサイトは、真の意味での「完成」ではありません。
                  <br />
                  <br />
                  デザインはビジネスの「入口」ですが、コードは「土台」です。広告費をかけて集客するなら、1秒でも早くページを開くこと。社内で文言を変えたいなら、エンジニアを呼ばなくても変えられること。そうした「当たり前の品質」を追求します。
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div className="border border-card-border border-l-4 border-l-accent pl-5 bg-accent-muted/50 py-4 pr-4 rounded-r-2xl transition-colors">
                    <span className="block text-accent mb-2 text-[10px] uppercase font-black tracking-widest">
                      技術領域
                    </span>
                    <span className="font-bold text-foreground leading-loose">
                      HTML / CSS / JS / WordPress / PHP / etc.
                    </span>
                  </div>
                  <div className="border border-card-border border-l-4 border-l-accent pl-5 bg-accent-muted/50 py-4 pr-4 rounded-r-2xl transition-colors">
                    <span className="block text-accent mb-2 text-[10px] uppercase font-black tracking-widest">
                      開発環境
                    </span>
                    <span className="font-bold text-foreground leading-loose">
                      Git / Figma / Canva / Generative AI
                    </span>
                  </div>
                </div>

                <div className="mt-14">
                  <Link
                    href={EXTERNAL_LINKS.CLOUDWORKS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg transition-all shadow-none hover:opacity-90 hover:scale-105 active:scale-95 group-hover:shadow-xl group-hover:shadow-accent/20 group-hover:scale-[1.02] mt-4"
                  >
                    クラウドワークスで相談する
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 text-center border-t border-card-border bg-background">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            © 2026 Bulauza.
          </p>
          <div className="flex gap-10">
            {[
              {
                name: "GitHub",
                url: EXTERNAL_LINKS.GITHUB,
              },
              {
                name: "Zenn",
                url: EXTERNAL_LINKS.ZENN,
              },
            ].map((platform) => (
              <Link
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-foreground transition-colors font-semibold"
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
