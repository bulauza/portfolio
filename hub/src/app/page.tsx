import Image, { getImageProps } from "next/image";
import Link from "next/link";
import works from "@/data/works.json";
import { EXTERNAL_LINKS } from "@/config/links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faBolt,
  faRocket,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";

type ThemedWorkImageProps = {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  isPriority: boolean;
};

/**
 * OSのカラースキームに応じて対応するテーマ画像を選択するコンポーネント
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
    sizes: "(max-width: 768px) 100vw, 50vw",
    priority: isPriority,
    className: "object-cover",
  };

  const { props: darkProps } = getImageProps({ src: darkSrc, ...sharedConfig });
  const { props: lightProps } = getImageProps({
    src: lightSrc,
    ...sharedConfig,
  });

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={darkProps.srcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...lightProps} />
    </picture>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-card-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-xl tracking-tight hover:opacity-70 transition-opacity"
          >
            Bulauza
          </Link>
          <div className="flex gap-4 md:gap-8 text-xs md:text-sm font-medium items-center">
            <Link
              href="#about"
              className="hidden sm:block hover:text-foreground/70 transition-colors"
            >
              About
            </Link>
            <Link
              href="#works"
              className="hidden sm:block hover:text-foreground/70 transition-colors"
            >
              Works
            </Link>
            <Link
              href="#contact"
              className="px-4 py-1.5 md:px-5 md:py-2 bg-foreground text-background rounded-full hover:opacity-80 transition-all font-semibold"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-32 max-w-6xl mx-auto px-6 overflow-hidden">
        {/* Hero Section */}
        <section id="mission" className="mb-40 pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="up">
              <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.2] mb-10 text-balance break-phrase">
                <span className="text-2xl sm:text-3xl md:text-5xl font-bold opacity-90 block mb-6">
                  LP・Webサイト制作を
                </span>
                <span className="block">
                  確かな「
                  <span className="text-brand drop-shadow-sm">開発力</span>
                  」で支えます
                </span>
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="text-lg md:text-xl text-foreground/70 font-medium leading-relaxed max-w-2xl text-pretty break-phrase md:mx-0 mx-auto">
                見た目の美しさは序章に過ぎません。
                <br />
                最短での市場投入（MVP）と、その後の改善を高速化する、保守性の高い実装。ビジネススピードを落とさず、公開後からが本当の勝負であるWebサイトの「使い心地」と「安心感」をご提供します。
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Text Paradigm Section & Core Values */}
        <section className="mb-40 relative">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 relative z-10">
              <FadeIn direction="left">
                <span className="text-sm font-bold tracking-[0.2em] text-foreground/50 uppercase block mb-6">
                  Philosophy
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8 break-phrase">
                  デザインを機能として捉える
                </h2>
              </FadeIn>
            </div>
            <div className="md:col-span-7">
              <FadeIn direction="up" delay={0.2}>
                <p className="text-lg leading-loose text-foreground/80 md:pl-10 md:border-l border-card-border text-pretty break-phrase mb-16">
                  「作って終わり」にせず、数年先も「頼んでよかった」と思える価値を。
                  ピクセル単位の再現よりも、あらゆる画面幅での「崩れにくさ」と、ユーザーが迷わない「レスポンス」を優先します。
                  <br />
                  <br />
                  1箇所の文言変更でレイアウトが崩れたり、複雑すぎて誰も触れなくなる使い捨てのサイトは作りません。
                  実装上の制約やより良いUXのアイデアは積極的に代替案を提示し、ビジネスを駆動させる強固な土台を構築します。
                </p>
              </FadeIn>

              {/* 削除されていた情報の復活 (No Cards) */}
              <div className="mt-16 md:mt-0 md:pl-10">
                <FadeIn direction="up" delay={0.3}>
                  <span className="text-xs font-bold tracking-widest text-foreground/40 uppercase block mb-8">
                    Core Strengths
                  </span>
                </FadeIn>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {[
                    {
                      label: "表示の高速化",
                      desc: "適切なコード整理と軽量化",
                      icon: faBolt,
                    },
                    {
                      label: "迅速な立ち上げ",
                      desc: "モダン環境によるスピーディな開発",
                      icon: faRocket,
                    },
                    {
                      label: "運用のしやすさ",
                      desc: "納品後の更新を考慮した設計",
                      icon: faTools,
                    },
                  ].map((item, i) => (
                    <FadeIn
                      key={item.label}
                      direction="up"
                      delay={0.4 + i * 0.1}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="text-brand w-5 h-5 opacity-90 drop-shadow-sm"
                        />
                        <h3 className="text-base font-bold">{item.label}</h3>
                      </div>
                      <p className="text-sm text-foreground/60 leading-relaxed pr-4">
                        {item.desc}
                      </p>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Works Section (Zig-zag Layout) */}
        <section id="works" className="mb-48 scroll-mt-32">
          <FadeIn>
            <div className="flex justify-between items-end mb-24 border-b border-card-border pb-8">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Selected Works
              </h2>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-32 md:gap-48">
            {works.map((work, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={work.id}
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-16 items-center group`}
                >
                  {/* Image Part */}
                  <div className="w-full md:w-3/5">
                    <FadeIn direction={isEven ? "left" : "right"}>
                      <Link
                        href={work.links?.demo || "#"}
                        target="_blank"
                        className="block relative aspect-16/10 overflow-hidden bg-card-bg border border-card-border shadow-sm group-hover:shadow-xl transition-all duration-700"
                      >
                        {work.imageDark && work.imageLight && (
                          <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out">
                            <ThemedWorkImage
                              darkSrc={work.imageDark}
                              lightSrc={work.imageLight}
                              alt={`${work.title} - LP制作・Web開発実績例`}
                              isPriority={index === 0}
                            />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                      </Link>
                    </FadeIn>
                  </div>

                  {/* Text Part */}
                  <div className="w-full md:w-2/5 flex flex-col justify-center">
                    <FadeIn direction="up" delay={0.2}>
                      <div className="flex gap-2 mb-6 flex-wrap">
                        {work.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-bold tracking-widest text-foreground/60 border border-card-border px-3 py-1 rounded-full bg-card-bg/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-bold mb-6">{work.title}</h3>
                      <p className="text-foreground/70 text-base leading-relaxed text-pretty break-phrase mb-8">
                        {work.description}
                      </p>

                      <Link
                        href={work.links?.demo || "#"}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
                      >
                        View Project
                        <svg
                          className="w-4 h-4"
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
                      </Link>
                    </FadeIn>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-20 scroll-mt-24">
          <FadeIn>
            <div className="p-8 md:p-16 bg-card-bg border border-card-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl flex flex-col md:flex-row gap-12 items-start relative z-10 transition-all duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
              <div className="shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-100 dark:bg-zinc-800 overflow-hidden rounded-2xl shadow-inner border border-card-border">
                  <Image
                    src="/images/self_portrait.jpeg"
                    alt="Self-portrait"
                    width={160}
                    height={160}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s]"
                  />
                </div>
              </div>

              <div className="flex-1">
                <span className="text-xs font-bold text-foreground/50 tracking-[0.2em] uppercase mb-4 block">
                  About Me
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-foreground break-phrase">
                  Bulauza
                </h2>
                <h3 className="text-xl md:text-2xl font-bold mb-8 text-foreground opacity-90 break-phrase leading-relaxed border-b border-card-border pb-8">
                  「1年後の自分が、一番使いやすいコードを。」
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-10 text-base md:text-lg text-pretty break-phrase">
                  プライム企業に在籍する現役エンジニアとして、システム開発の現場で培った「保守性への執着」をWeb制作に注ぎます。
                  <br />
                  「丁寧だから制作が遅い」わけではありません。モダンな技術スタックを駆使し、ビジネスの検証に必要なプロダクトを最短で市場に出すスピードも重視しています。
                  <br />
                  デザインはビジネスの「入口」ですが、コードは「土台」です。広告費をかけて集客するなら、1秒でも早くページを開く。社内で文言を変えたいなら、エンジニアを呼ばなくても変えられる。
                  <br />
                  「スピード」と「当たり前の品質」を両立し、納品先でも長く愛・活用されるサイトを作ります。
                </p>

                <div className="mt-8">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-foreground text-background font-bold text-xs md:text-sm tracking-wider uppercase transition-all hover:opacity-80 group text-center"
                  >
                    Contact Me
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="group-hover:translate-x-1 transition-transform border-none"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-20 scroll-mt-24">
          <FadeIn>
            <ContactForm />
          </FadeIn>
        </section>
      </main>

      <footer className="py-20 text-center border-t border-card-border bg-background">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-foreground/60 text-sm font-medium tracking-wide">
            © 2026 Bulauza. All Rights Reserved.
          </p>
          <div className="flex gap-10">
            {[
              { name: "GitHub", url: EXTERNAL_LINKS.GITHUB },
              { name: "Zenn", url: EXTERNAL_LINKS.ZENN },
            ].map((platform) => (
              <Link
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/60 hover:text-foreground transition-colors font-semibold uppercase tracking-widest"
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
