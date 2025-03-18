import LiffProvider from "@/app/_components/LiffProvider/LiffProvider";
import { PropsWithChildren } from "react";

export default function IdLayout({
  children,
  params,
}: PropsWithChildren<{ params: { id: string } }>) {
  // 根據 id 動態取得 LIFF ID
  const dynamicLiffId = getLiffIdFromDynamicParam(params.id);

  return <LiffProvider liffId={dynamicLiffId}>{children}</LiffProvider>;
}

// 根據 id 回傳對應的 LIFF ID（可改為 API 查詢）
function getLiffIdFromDynamicParam(id: string): string {
  const liffIds: Record<string, string> = {
    2007028490: "2007049862-Le590xkP",
    2007054553: "LIFF_ID_2",
  };

  return liffIds[id] || "DEFAULT_LIFF_ID";
}
