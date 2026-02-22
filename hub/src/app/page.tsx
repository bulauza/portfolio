import Image from "next/image";
import Link from "next/link";
import works from "@/data/works.json";
import Pic from "@/images/works/lp-it-consult.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#38BDF8] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight">
            PORTFOLIO-BULAUZA
          </span>
          <div className="flex gap-8 text-sm font-medium items-center">
            <Link
              href="#about"
              className="hover:text-[#38BDF8] transition-colors"
            >
              About
            </Link>
            <Link
              href="#works"
              className="hover:text-[#38BDF8] transition-colors"
            >
              Works
            </Link>
            <Link
              href="mailto:your-email@example.com"
              className="bg-[#0F172A] text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero Section */}
        <section id="about" className="max-w-6xl mx-auto px-6 mb-32">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-extrabold leading-tight mb-8">
              Full-stack Engineering <br />
              <span className="text-[#38BDF8]">meets</span> Web Crafting.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              SaaS開発で培った堅牢な設計思考と、WordPressを用いた柔軟なコンテンツ管理を融合。
              Vercel
              Rewritesによるモダンなインフラ構成で、高速かつ運用性の高いWeb体験を提供します。
            </p>
            <div className="flex gap-4">
              {["Next.js", "TypeScript", "WordPress", "C#.NET", "SQL"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-500 border border-slate-200"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section
          id="works"
          className="bg-white py-32 border-t border-slate-100"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-4 italic">
                  Featured Works
                </h2>
                <p className="text-slate-500">
                  案件受注に向けたWeb制作の実績コレクション
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {works.map((work) => (
                <Link
                  key={work.id}
                  href={work.links?.demo}
                  target="_blank"
                  className="group block"
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl mb-6 bg-slate-100 ring-1 ring-slate-200">
                    {work.image && (
                      <Image
                        src={work.image}
                        alt={work.title}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-[#38BDF8] tracking-widest uppercase mb-2 block">
                        {work.category}
                      </span>
                      <h3 className="text-xl font-bold group-hover:text-[#38BDF8] transition-colors">
                        {work.title}
                      </h3>
                      <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                        {work.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#38BDF8] group-hover:border-[#38BDF8] transition-all">
                      <svg
                        className="w-5 h-5 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 text-center border-t border-slate-100">
        <p className="text-slate-400 text-sm">
          © 2026 portfolio-monorepo. Powered by Next.js & Vercel.
        </p>
      </footer>
    </div>
  );
}
