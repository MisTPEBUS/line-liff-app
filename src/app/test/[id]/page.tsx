/* "use client";
import { useEffect, useState } from "react";

import { useLiff } from "@/app/_components/LiffProvider/LiffProvider";
import liff from "@line/liff";
type LiffProfile = Awaited<ReturnType<typeof liff.getProfile>>;

export default function Page() {
  const { initialized } = useLiff();

  const [profile, setProfile] = useState<LiffProfile | null>(null);

  useEffect(() => {
    if (!initialized) return;

    const fetchProfile = async () => {
      if (liff.isLoggedIn()) {
        const userProfile = await liff.getProfile();
        setProfile(userProfile);
      } else {
        liff.login();
      }
    };

    fetchProfile();
  }, [initialized]);

  return (
    <div>
      {profile ? <div>你好，{profile.displayName}</div> : <div>讀取中...</div>}
    </div>
  );
}
 */
