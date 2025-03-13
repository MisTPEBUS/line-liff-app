import ProfileClient from "@/components/ProfileClient";
interface PageProps {
  params: { id: string }; // ✅ 確保 `params` 正確
}

export default function DynamicPage({ params }: PageProps) {
  return <ProfileClient />;
}
