"use client";

import { ReactNode, useEffect, useState } from "react";
import liff from "@line/liff";

interface LineLiffProps {
  id: string;
  children?: ReactNode;
}

const LineLiff = ({ id, children }: LineLiffProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  /*  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "YOUR_LIFF_ID" });

        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          setIsLoggedIn(true);
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        }
      } catch (error) {
        console.error("LIFF 初始化失敗:", error);
      }
    };

    initLiff();
  }, []); */

  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-lg font-bold">LINE LIFF Page</h2>
      <p>ID: {id}</p>

      {isLoggedIn ? (
        <div>
          <p>已登入 LINE</p>
          <p>名稱: {profile?.displayName}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() =>
              liff.sendMessages([
                { type: "text", text: `Cash Notify ID: ${id}` },
              ])
            }
          >
            發送 ID 到 LINE
          </button>
        </div>
      ) : (
        <p>正在登入...</p>
      )}
    </div>
  );
};

export default LineLiff;
