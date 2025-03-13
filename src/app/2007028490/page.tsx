import ProfileClient from "@/components/ProfileClient";
import Cookies from "js-cookie";
interface PageProps {
  params: { id: string }; // ✅ 正確的 `params` 型別
}

export default function DynamicPage({ params }: PageProps) {
  const { id } = params; // ✅ 直接讀取 URL 參數
  Cookies.set("channelId", id, { expires: 7 });
  return <ProfileClient />;
}
