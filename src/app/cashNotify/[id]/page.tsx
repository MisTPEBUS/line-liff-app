"use client"; // ✅ 這是 Client Component，避免 SSR

import LineLiff from "@/app/_components/LineLiff/LineLiff";

import { useParams } from "next/navigation";
import NotifyInfo from "./notify_info/page";

const CashNotifyPage = () => {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0] || "";

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Cash Notify ID: {id}</h1>

      <LineLiff id={id}>
        <NotifyInfo />
      </LineLiff>
    </div>
  );
};

export default CashNotifyPage;
