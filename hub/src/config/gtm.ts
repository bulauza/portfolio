/**
 * Google Tag Manager 設定
 *
 * GTMコンテナIDを一元管理する。
 * 本番運用時は環境変数 NEXT_PUBLIC_GTM_ID を設定し、
 * ハードコードされたフォールバック値を上書きする想定。
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-PCDVJ9RW";
