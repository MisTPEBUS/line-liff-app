"use client";

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
    if (params?.id) {
      Cookies.set("channelId", params.id, { expires: 7 });
    }
  }, [params?.id]);

  return <ProfileClient />;
};

export default Page;
