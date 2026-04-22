import { Resend } from "resend";
import fs from "fs";
import path from "path";

// RESEND_API_KEY がなくてもビルドエラーにならないよう、取得できなければ null
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface ContactData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

/**
 * 問い合わせ受け付け時の自動返信（および管理者Cc）メールを送信する
 */
export async function sendAutoReplyEmail({
  name,
  email,
  subject,
  message,
}: ContactData) {
  // テンプレートの読み込み (サーバー環境で動作させるために process.cwd() からパスを構築)
  const templatePath = path.join(process.cwd(), "src/config/mailTemplate.txt");
  let mailBody = "";

  try {
    mailBody = fs.readFileSync(templatePath, "utf-8");
  } catch (e) {
    console.error("メールテンプレートファイルが見つかりません。", e);
    // フォールバック用の簡素な文面
    mailBody = `お問い合わせありがとうございます。\n\nお名前：{{name}}\nメールアドレス：{{email}}\n件名：{{subject}}\n\nお問い合わせ内容：\n{{message}}`;
  }

  // 変数展開 (プレースホルダーを置換)
  mailBody = mailBody
    .replace(/{{name}}/g, name)
    .replace(/{{email}}/g, email)
    .replace(/{{subject}}/g, subject || "なし")
    .replace(/{{message}}/g, message);

  // 送信元と管理者（Cc）のアドレス
  const fromAddress = process.env.RESEND_FROM_EMAIL || "info@yourdomain.com";
  const adminEmail =
    process.env.RESEND_ADMIN_EMAIL || process.env.RESEND_FROM_EMAIL;
  const ccAddresses = adminEmail ? [adminEmail] : undefined;

  // Resend を使用してメール送信
  if (resend) {
    await resend.emails.send({
      from: `お問い合わせ窓口 <${fromAddress}>`,
      to: [email],
      cc: ccAddresses,
      subject: "【お問い合わせ完了】ご連絡ありがとうございます",
      text: mailBody,
    });
  } else {
    console.warn(
      "⚠️ RESEND_API_KEY が設定されていません。メールは送信されませんでした。",
    );
    console.log("【送信プレビュー】\n", mailBody);
  }
}
