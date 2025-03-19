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
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "YOUR_LIFF_ID" });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        setIsLoggedIn(true);
        const userProfile = await liff.getProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error("LIFF 初始化失敗:", error);
      }
    };

    initLiff();
  }, []);

  return (
    <LiffContext.Provider value={{ profile, isLoggedIn }}>
      {children}
    </LiffContext.Provider>
  );
};
