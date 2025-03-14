"use client"; // ✅ 必須加上這行，讓 Next.js 知道這是 Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ 用來導向不同頁面
import Cookies from "js-cookie"; // ✅ 讀取 & 設定 Cookie
import axios from "axios";
import { getUserProfile, initLiff } from "@/utils/liff";

export default function ProfileClient() {
  const router = useRouter(); // ✅ 設定 Next.js router
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🟢 useEffect 觸發了！");
    debugger; // ✅ 這行會讓 DevTools 停住，幫助你檢查變數

    async function fetchUserIdAndData() {
      console.log("🟢 fetchUserIdAndData 開始執行");
      await initLiff();
      const Profile = await getUserProfile();
      console.log("🟢 取得的 Profile:", Profile);

      if (Profile?.userId) {
        setUserId(Profile.userId);
        Cookies.set("userId", Profile?.userId, { expires: 7 });
        Cookies.set("displayName", Profile?.displayName, { expires: 7 });

        try {
          console.log("🟢 發送 API 請求... Profile?.userId");
          const response = await axios.post(
            "https://line-notify-18ab.onrender.com/v1/api/lineHook/user/checkUser",
            {
              userId: "U75e1554845bd81cba2151682ee99363d",
              channelId: "2007028490",
            }
          );

          if (response.data && response.data.id) {
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
