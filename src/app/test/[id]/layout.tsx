import LiffProvider from "@/app/_components/LiffProvider/LiffProvider";

export default function IdLayout({
  children,
  params, // 這裡要加上 params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const dynamicLiffId = liffIdMapping[params.id] || "default_liff_id";

  return <LiffProvider liffId={dynamicLiffId}>{children}</LiffProvider>;
}

// 根據 params.id 回傳 liffId（你可以改為實際邏輯）
function getLiffIdFromDynamicParam(id: string): string {
  const liffIds: Record<string, string> = {
    2007028490: "2007049862-Le590xkP",
    2007054553: "LIFF_ID_2",
  };

  return liffIds[id] || "DEFAULT_LIFF_ID";
}
