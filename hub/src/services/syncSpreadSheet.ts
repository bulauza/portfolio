import { ContactData } from "./sendEmail";

/**
 * 問い合わせデータをGoogle Apps Script (スプレッドシート) へ連携する
 */
export async function syncToSpreadsheet(_data: ContactData) {
  const webhookUrl = process.env.GAS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log(
      "ℹ️ GASへのデータ送信処理はスケルトン化されています (URL未設定)。",
    );
    return;
  }

  // TODO: 実際の GAS 連携の実装
  /*
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    });
  } catch (e) {
    console.error("GASへのデータ転送に失敗しました", e);
    // スプレッドシート側の障害でフロントを落としたくないため、
  }
  */
}
