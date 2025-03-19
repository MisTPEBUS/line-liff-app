"use client"; // ✅ 這是 Client Component，避免 SSR

import { useParams } from "next/navigation";
import LineLiff from "@/components/LineLiff";
import ProductDetail from "@/components/ProductDetail";
import NotifyInfo from "@/components/NotifyInfo";

const CashNotifyPage = () => {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0] || "";

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Cash Notify ID: {id}</h1>
      <ProductDetail id={id} />
      <LineLiff id={id}>
        <NotifyInfo />
      </LineLiff>
    </div>
  );
};

export default CashNotifyPage;
