// src/context/LiffContext.tsx
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
          withLoginOnExternalBrowser: false, // ✅ 確保 LIFF 只在 LINE 內部處理
        });

        if (!liff.isLoggedIn()) {
          const redirectUrl = window.location.href;
          console.log("🔹 Redirecting to LIFF login:", redirectUrl);
          liff.login({ redirectUri: redirectUrl });
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

  return (
    <LiffContext.Provider value={{ profile, isLoggedIn }}>
      {children}
    </LiffContext.Provider>
  );
};
