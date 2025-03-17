"use client";
import { useEffect, useState, createContext, useContext } from "react";
import liff from "@line/liff";

interface LiffContextValue {
  initialized: boolean;
}

const LiffContext = createContext<LiffContextValue>({ initialized: false });

export const useLiff = () => useContext(LiffContext);

export default function LiffProvider({
  liffId, // 動態傳入 liffId
  children,
}: {
  liffId: string;
  children: React.ReactNode;
}) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initLiff = async () => {
      await liff.init({ liffId });
      setInitialized(true);
    };

    initLiff();
  }, [liffId]);

  return (
    <LiffContext.Provider value={{ initialized }}>
      {children}
    </LiffContext.Provider>
  );
}
