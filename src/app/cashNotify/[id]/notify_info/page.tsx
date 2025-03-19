"use client";

import { useLiff } from "@/app/_context/LiffContext";

const NotifyInfo = () => {
  const { profile, isLoggedIn } = useLiff();

  return (
    <div className="mt-4 p-3 bg-gray-100 rounded">
      <h3 className="text-md font-semibold">通知資訊</h3>
      {isLoggedIn ? (
        <div>
          <p>👤 {profile?.displayName}</p>
          {profile?.pictureUrl && (
            <img
              src={profile.pictureUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full mt-2"
            />
          )}
        </div>
      ) : (
        <p>尚未登入</p>
      )}
    </div>
  );
};

export default NotifyInfo;
