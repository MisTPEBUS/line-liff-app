"use client";

import { ReactNode } from "react";
import { LiffProvider } from "@/context/LiffContext";

interface LineLiffProps {
  id: string;
  children?: ReactNode;
}

const LineLiff = ({ id, children }: LineLiffProps) => {
  return (
    <LiffProvider>
      <div className="p-4 border rounded-lg shadow-lg mt-4">
        <h2 className="text-lg font-bold">LINE LIFF</h2>
        <p>ID: {id}</p>
        {children}
      </div>
    </LiffProvider>
  );
};

export default LineLiff;
