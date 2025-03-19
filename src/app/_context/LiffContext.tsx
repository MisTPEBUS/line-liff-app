"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import liff from "@line/liff";

interface LiffProfileType {
  displayName: string;
  userId: string;
  pictureUrl?: string;
  statusMessage?: string;
}

interface LiffContextType {
  profile: LiffProfileType | null;
  isLoggedIn: boolean;
  sendBackToLiffMessage: () => void;
}

const LiffContext = createContext<LiffContextType | undefined>(undefined);

export const useLiff = () => {
  const context = useContext(LiffContext);
  if (!context) {
    throw new Error("useLiff 必須在 LiffProvider 內使用");
  }
  return context;
};

export const LiffProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<LiffProfileType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initLiff = async () => {
      try {
        await liff.init({
          liffId: "2007049862-Le590xkP",
          withLoginOnExternalBrowser: true, // ✅ 確保外部瀏覽器也能登入
        });

        if (!liff.isLoggedIn()) {
          console.log("🔹 Redirecting to LIFF login:", window.location.href);
          liff.login({ redirectUri: window.location.href });
          return;
        }

        setIsLoggedIn(true);
        const userProfile = await liff.getProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error("❌ LIFF 初始化失敗:", error);
      }
    };

    initLiff();
  }, []);

  // 🔹 修正滑動問題
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // 🔹 發送回到 LIFF 的連結
  const sendBackToLiffMessage = async () => {
    try {
      if (!liff.isLoggedIn()) {
        alert("請先登入 LINE");
        return;
      }

      const liffUrl = liff.permanentLink.createUrl(); // ✅ 產生 LIFF 的返回網址

      await liff.sendMessages([
        {
          type: "text",
          text: `點擊這裡回到應用 👉 ${liffUrl}`,
        },
      ]);

      alert("已發送返回 LIFF 應用的連結！");
    } catch (error) {
      console.error("發送訊息失敗:", error);
    }
  };

  return (
    <LiffContext.Provider
      value={{ profile, isLoggedIn, sendBackToLiffMessage }}
    >
      {children}
    </LiffContext.Provider>
  );
};
