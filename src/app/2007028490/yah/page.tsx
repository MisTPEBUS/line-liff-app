"use client";

import { useState } from "react";
import axios from "axios";

export default function ApiTestPage() {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setResponseData(null);
    setError(null);

    console.log("🟢 準備發送 API 請求...");

    try {
      const response = await axios.post(
        "https://line-notify-18ab.onrender.com/v1/api/lineHook/user/checkUser",
        {
          userId: "U75e1554845bd81cba2151682ee99363d",
          channelId: "2007028490",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ API 回應:", response.data);
      setResponseData(response.data); // ✅ 更新畫面上的 API 回應
    } catch (error: any) {
      if (error.response) {
        console.error("❌ API 失敗 (Server 回應):", error.response.data);
        setError(JSON.stringify(error.response.data, null, 2));
      } else if (error.request) {
        console.error("❌ API 失敗 (無回應):", error.request);
        setError("API 無回應，請檢查伺服器狀態");
      } else {
        console.error("❌ API 請求錯誤:", error.message);
        setError(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">API 測試頁面</h1>
      <button
        onClick={testApi}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        {loading ? "測試中..." : "測試 API"}
      </button>

      {responseData && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <h2 className="text-lg font-bold">✅ API 回應：</h2>
          <pre className="text-sm">{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
          <h2 className="text-lg font-bold">❌ API 失敗：</h2>
          <pre className="text-sm">{error}</pre>
        </div>
      )}
    </div>
  );
}
