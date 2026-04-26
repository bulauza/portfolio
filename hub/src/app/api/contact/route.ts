import { NextResponse } from "next/server";
import { sendAutoReplyEmail } from "@/services/sendEmail";
import { syncToSpreadsheet } from "@/services/syncSpreadSheet";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message, turnstileToken } = data;

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "必要な項目が入力されていません。" },
        { status: 400 },
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { error: "スパム検証に失敗しました。もう一度お試しください。" },
        { status: 400 },
      );
    }

    // クライアントIPの取得（Turnstileの検証精度向上のため）
    const remoteIp =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      "";

    // Turnstileのトークン検証 (FormDataを使用)
    const formData = new FormData();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY || "");
    formData.append("response", turnstileToken);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      console.error("Turnstile validation failed:", verifyData["error-codes"]);
      return NextResponse.json(
        { error: "スパム検証に失敗しました。もう一度お試しください。" },
        { status: 400 },
      );
    }

    const payload = { name, email, subject, message };

    await Promise.allSettled([
      sendAutoReplyEmail(payload),
      syncToSpreadsheet(payload),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("お問い合わせ送信処理エラー:", error);
    return NextResponse.json(
      { error: "お問い合わせの受け付け中にエラーが発生しました。" },
      { status: 500 },
    );
  }
}
