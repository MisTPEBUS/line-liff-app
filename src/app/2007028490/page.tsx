import ProfileClient from "@/components/ProfileClient";
import Cookies from "js-cookie";

export default function DynamicPage() {
  Cookies.set("channelId", "2007028490", { expires: 7 });
  return <ProfileClient />;
}
