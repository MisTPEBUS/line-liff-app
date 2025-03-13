"use client";

import { useEffect } from "react";
import ProfileClient from "@/components/ProfileClient";
import Cookies from "js-cookie";

type PageProps = {
  params: {
    id: string;
  };
};

const Page = () => {
  return <ProfileClient />;
};

export default Page;
