import Cookies from "js-cookie";
import ProfileClient from "./_components/ProfileClient";

export default function DynamicPage() {
  Cookies.set("channelId", "2007028490", { expires: 7 });
  return <ProfileClient />;
}
