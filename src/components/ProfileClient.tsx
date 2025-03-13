"use client"; // ✅ 必須加上這行，讓 Next.js 知道這是 Client Component

import { getUserId, initLiff } from "@/utils/liff";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function ProfileClient() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserId() {
      await initLiff(); // ✅ 先初始化 LIFF
      const id = await getUserId();

      if (id) {
        setUserId(id);
        Cookies.set("userId", id, { expires: 7 });
      }
      setLoading(false);
    }

    fetchUserId();
  }, []);

  if (loading) {
    return <p>載入中...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">LIFF 使用者資訊</h1>
      {userId ? (
        <p className="mt-4 text-lg">你的 User ID：{userId}</p>
      ) : (
        <p>⚠️ 無法取得使用者 ID，請確保你已登入並授權！</p>
      )}
    </div>
  );
}
