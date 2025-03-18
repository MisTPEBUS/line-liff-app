import LiffProvider from "@/app/_components/LiffProvider/LiffProvider";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: { id: string }; // 確保 params 是正確的型別
}

export default function IdLayout({ children, params }: LayoutProps) {
  // 根據 id 取得對應的 LIFF ID
  const dynamicLiffId = getLiffIdFromDynamicParam(params.id);

  return <LiffProvider liffId={dynamicLiffId}>{children}</LiffProvider>;
}

// 根據 id 回傳對應的 LIFF ID（可改為 API 查詢）
function getLiffIdFromDynamicParam(id: string): string {
  const liffIds: Record<string, string> = {
    shopA: "LIFF_ID_1",
    shopB: "LIFF_ID_2",
  };

  return liffIds[id] || "DEFAULT_LIFF_ID";
}
