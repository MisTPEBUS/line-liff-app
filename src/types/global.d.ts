// src/types/global.d.ts

import type { Liff } from "@line/liff";

export {};

declare global {
  interface Window {
    liff: Liff;
  }
}
