"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import FadeIn from "./FadeIn";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      turnstileToken: formData.get("cf-turnstile-response"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "送信に失敗しました");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("予期せぬエラーが発生しました");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <FadeIn>
        <div className="p-8 md:p-12 bg-card-bg border border-brand/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl text-center flex flex-col items-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-brand w-16 h-16 mb-6 drop-shadow-sm opacity-90"
          />
          <h3 className="text-3xl font-extrabold mb-4 tracking-tight">
            お問い合わせを受け付けました
          </h3>
          <p className="text-foreground/70 mb-8 max-w-lg leading-relaxed text-pretty break-phrase">
            入力いただいたメールアドレス宛に自動返信メールを送信いたしました。
            <br />
            内容を確認の上、追ってご連絡させていただきますので、今しばらくお待ちください。
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-sm font-bold text-foreground/50 hover:text-foreground transition-colors underline underline-offset-4"
          >
            新しく問い合わせる
          </button>
        </div>
      </FadeIn>
    );
  }

  return (
    <div className="bg-card-bg border border-card-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 md:p-12 transition-all duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
      <div className="mb-10 text-center">
        <span className="text-xs font-bold text-foreground/50 tracking-[0.2em] uppercase mb-4 block">
          Contact
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground break-phrase">
          お問い合わせ
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-2xl mx-auto"
      >
        {errorMsg && (
          <div className="flex items-center gap-3 bg-red-500/10 text-red-500 p-4 rounded-xl border border-red-500/20 text-sm font-bold">
            <FontAwesomeIcon icon={faExclamationCircle} />
            {errorMsg}
          </div>
        )}

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-bold text-foreground/80"
          >
            お名前 <span className="text-brand text-xs ml-1">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isSubmitting}
            className="w-full bg-background border border-border/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all disabled:opacity-50"
            placeholder="山田 太郎"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-bold text-foreground/80"
          >
            メールアドレス <span className="text-brand text-xs ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isSubmitting}
            className="w-full bg-background border border-border/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all disabled:opacity-50"
            placeholder="example@yourdomain.com"
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="subject"
            className="text-sm font-bold text-foreground/80"
          >
            件名
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            disabled={isSubmitting}
            className="w-full bg-background border border-border/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all disabled:opacity-50"
            placeholder="Web制作についてのご相談"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm font-bold text-foreground/80"
          >
            お問い合わせ内容 <span className="text-brand text-xs ml-1">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            disabled={isSubmitting}
            className="w-full bg-background border border-border/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all resize-y disabled:opacity-50"
            placeholder="ご相談内容をご記入ください"
          ></textarea>
        </div>

        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        ></div>

        <div className="mt-4 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-bold text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 min-w-[200px]"
          >
            {isSubmitting ? (
              <span className="animate-pulse">送信中...</span>
            ) : (
              <>
                送信する
                <FontAwesomeIcon icon={faPaperPlane} className="opacity-90" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
