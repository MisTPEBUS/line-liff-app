"use client"; // ✅ 這是 Client Component，避免 SSR

import LineLiff from "@/app/_components/LineLiff/LineLiff";

import { useParams } from "next/navigation";
import NotifyInfo from "./notify_info/page";
import { useLiff } from "@/app/_context/LiffContext";

const CashNotifyPage = () => {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0] || "";

  const { isLoggedIn } = useLiff();

  const handleCloseLiff = () => {
    if (typeof window !== "undefined" && window.liff) {
      window.liff.closeWindow();
    } else {
      window.close(); // 若非 LIFF 環境則嘗試關閉一般瀏覽器頁面
    }
  };
  return (
    <div className="p-6">
      <LineLiff id={id}>
        <NotifyInfo />
        {isLoggedIn && (
          <button
            onClick={handleCloseLiff}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            關閉視窗
          </button>
        )}
      </LineLiff>
    </div>
  );
};

export default CashNotifyPage;
