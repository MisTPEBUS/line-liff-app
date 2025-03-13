import ProfileClient from "@/components/ProfileClient";

interface PageProps {
  params: { id: string }; // ✅ `params` 內的 `id`
}

export default function DynamicPage({ params }: PageProps) {
  return <ProfileClient channelId={params.id} />; // ✅ 傳遞 `id`
}
