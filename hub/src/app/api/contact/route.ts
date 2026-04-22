import { NextResponse } from "next/server";
import { sendAutoReplyEmail } from "@/services/sendEmail";
import { syncToSpreadsheet } from "@/services/syncSpreadSheet";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "必要な項目が入力されていません。" },
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
