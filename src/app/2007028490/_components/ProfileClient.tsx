"use client"; // ✅ 必須加上這行，讓 Next.js 知道這是 Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ 用來導向不同頁面
import Cookies from "js-cookie"; // ✅ 讀取 & 設定 Cookie
import axios from "axios";
import { getUserId, initLiff } from "@/utils/liff";

export default function ProfileClient() {
  const router = useRouter(); // ✅ 設定 Next.js router
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserIdAndData() {
      await initLiff(); // ✅ 先初始化 LIFF
      const id = await getUserId();

      if (id) {
        setUserId(id);
        Cookies.set("userId", id, { expires: 7 }); // ✅ 存入 Cookie

        try {
          // ✅ 發送 API 請求
          const response = await axios.post(
            "https://line-notify-18ab.onrender.com/v1/api/lineHook/user/checkUser",
            {
              userId: id,
              channelId: "2007028490",
            }
          );

          // ✅ 判斷 `id` 是否存在，導向不同路徑
          if (response.data.id) {
            router.push(`/2007028490/notify_info`);
          } else {
            router.push(`/2007028490/signIn`);
          }
        } catch (error) {
          console.error("❌ API 請求失敗:", error);
        }
      }

      setLoading(false);
    }

    fetchUserIdAndData();
  }, [router]); // ✅ `router` 變更時重新執行

  if (loading) {
    return <p> 載入中...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">正在驗證你的身份...</h1>
      <div className="p-6">
        <h1 className="text-2xl font-bold">LIFF 使用者資訊</h1>
        {userId ? (
          <p className="mt-4 text-lg">你的 User ID：{userId}</p>
        ) : (
          <p>⚠️ 無法取得使用者 ID，請確保你已登入並授權！</p>
        )}
      </div>
    </div>
  );
}
