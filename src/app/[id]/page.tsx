// ✅ 載入 Client Component

import ProfileClient from "@/components/ProfileClient";

interface PageProps {
  params: { id: string }; // ✅ 取得 `[id]` 參數
}

export default function DynamicPage({ params }: PageProps) {
  const { id } = params; // ✅ 讀取 URL 參數

  return <ProfileClient />;
}
