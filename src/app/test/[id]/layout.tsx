import LiffProvider from "@/app/_components/LiffProvider/LiffProvider";

const liffIdMapping: Record<string, string> = {
  "2007028490": "2007049862-Le590xkP",
  // 可以添加更多 id 對應的 LIFF ID
};

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
