import { useEffect } from "react";
import ProfileClient from "@/components/ProfileClient";


import Cookies from "js-cookie";
type PageProps = {
  params: {
    id: string;
  };
};

const Page = ({ params }: PageProps) => {
  useEffect(() => {
    const { id } = params; // ✅ 直接讀取 URL 參數
  Cookies.set("channelId", id, { expires: 7 });
  }, [params]);

  return (
    return <ProfileClient />;
  );
};




