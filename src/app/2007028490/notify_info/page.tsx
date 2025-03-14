"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import liff from "@line/liff";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// 定義 TypeScript 型別
type Employee = {
  id: string;
  company: string;
  groupCode: string;
  phone: string;
  job: string;
  dept: string;
  empId: string;
  name: string;
  channelId: string;
  userId: string;
  insertAt: string;
};

// 假資料
const test: Employee = {
  id: "acec81cc-5e65-442e-abc4-5cfe0af0f937",
  company: "臺北客運",
  groupCode: "",
  phone: "",
  job: "專員",
  dept: "D78 資訊中心",
  empId: "19541",
  name: "Lobinda Wang",
  channelId: "2007028490",
  userId: "U77bc55ff44a63d93b88e891780b6c04f",
  insertAt: "2025-03-13T03:35:29.060Z",
};

const NotificationBindingPage = () => {
  // 點選「是，解除綁定」按鈕時呼叫此函式
  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  const [mockData, setMockData] = useState<Employee>(test);
  useEffect(() => {
    const userId = Cookies.get("userId");
    setStoredUserId(userId || null);
    async function fetchUserIdAndData() {
      try {
        // ✅ 發送 API 請求
        const response = await axios.post(
          "https://line-notify-18ab.onrender.com/v1/api/lineHook/user/checkUser",
          {
            userId: userId,
            channelId: "2007028490",
          }
        );
        if (response.data) {
          setMockData(response.data);
        }
      } catch (error) {
        console.error("❌ API 請求失敗:", error);
      }
    }
    fetchUserIdAndData();
  }, []);
  const handleUnbind = async () => {
    try {
      await axios.delete(
        `https://line-notify-18ab.onrender.com/v1/api/lineHook/user/${mockData.channelId}/${storedUserId}`
      );
      alert("解除成功");
      liff.closeWindow();
    } catch (error) {
      console.error("解除綁定失敗：", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-orange-500">
        {mockData.company} 通知綁定
      </h1>

      <Card className="w-full p-6 bg-white shadow-lg rounded-xl border-none">
        <p className="text-gray-700 mt-4 text-center">
          您已經綁定至通知，是否要解除綁定？
        </p>
        <CardContent className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="font-bold">
            {mockData.name} {mockData.empId}
          </p>
          <p className="text-gray-600">
            您好，您目前已綁定並同意接受以下範圍的相關業務通知：
          </p>
          <ul className="text-gray-600 mt-2 space-y-1">
            <li>公司：{mockData.company}</li>
            <li>部門：{mockData.dept}</li>
            <li>職稱：{mockData.job}</li>
            <li>專案群組：{mockData.groupCode || "無"}</li>
            <li>員工編號：{mockData.empId}</li>
            <li>姓名：{mockData.name}</li>
          </ul>
        </CardContent>
        <div className="mt-6 flex flex-col space-y-2">
          <Button
            className="w-full bg-green-500 text-white py-2 rounded font-extrabold hover:bg-green-600"
            onClick={handleUnbind}
          >
            是，解除綁定
          </Button>
          <Button className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded font-bold">
            否，保持綁定
          </Button>
        </div>
        <h6
          id="channel-id"
          className="text-sm bg-gray-200 p-2 mt-4 text-center"
        >
          ChannelId: 2007028490
          <p>userId:{storedUserId}</p>
        </h6>
      </Card>
    </div>
  );
};

export default NotificationBindingPage;
