"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// ✅ 定義表單 schema
const formSchema = z.object({
  company: z.enum(["臺北客運", "首都客運"], { message: "請選擇公司" }),
  dept: z.enum(
    [
      "D64業務部",
      "D78 資訊中心",
      "T01四海站",
      "T02南雅站",
      "T03中和站",
      "T04新店站",
      "T05木柵站",
    ],
    { message: "請選擇部門" }
  ),
  job: z.string().optional(),
  projectGroup: z.string().optional(),
  empId: z.string().min(1, { message: "員工編號為必填" }),
  name: z.string().optional(),
});

const payload = {
  company: "",
  groupCode: "", // 如果沒有輸入專案群組則傳空字串
  phone: "", // 如果未提供 phone，可直接留空
  job: "",
  dept: "",
  empId: "",
  name: "",
  channelId: "2007028490", // 可根據需求動態調整
  userId: "", // 從 cookies 讀取的 userId
};

// ✅ 定義表單類型
type FormData = z.infer<typeof formSchema>;

export default function TaipeiBusBinding() {
  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  const [storedPayload, setStoredPayload] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const userId = Cookies.get("userId");
    const displayName = Cookies.get("displayName");
    payload.empId = userId as string;
    payload.name = displayName as string;

    setStoredUserId(userId || null);
  }, []);

  const onSubmit = (data: FormData) => {
    console.log("📢 表單提交:", data);
    alert("綁定成功！");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4  text-center text-orange-500">
        臺北客運通知綁定
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 公司名稱 */}
        <div className="relative">
          <label className="block font-semibold mb-2">
            公司名稱 <span className="text-red-500">*</span>
          </label>
          <select
            value="臺北客運"
            disabled
            {...register("company", { required: "請選擇公司" })}
            className="w-full p-2 border rounded bg-white appearance-none pr-8"
          >
            <option value="">請選擇公司</option>
            <option value="臺北客運">臺北客運</option>
            <option value="首都客運">首都客運</option>
          </select>
          <div className="absolute right-2 top-10 pointer-events-none">▼</div>
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* 部門 */}
        <div className="relative">
          <label className="block font-semibold mb-2">
            部門 <span className="text-red-500">*</span>
          </label>
          <select
            value=""
            {...register("dept", { required: "請選擇部門" })}
            className="w-full p-2 border rounded bg-white appearance-none pr-8"
          >
            <option value="">請選擇部門</option>
            <option value="D64業務部">D64業務部</option>
            <option value="D78 資訊中心">D78 資訊中心</option>
            <option value="T01四海站">T01四海站</option>
            <option value="T02南雅站">T02南雅站</option>
            {/* 其他選項 */}
          </select>
          <div className="absolute right-2 top-10 pointer-events-none">▼</div>
          {errors.dept && (
            <p className="text-red-500 text-sm mt-1">{errors.dept.message}</p>
          )}
        </div>

        {/* 職稱 */}
        <div className="relative">
          <label className="block font-semibold mb-2">職稱</label>
          <select
            value=""
            {...register("job")}
            className="w-full p-2 border rounded bg-white appearance-none pr-8"
          >
            <option value="">請選擇職稱</option>
            <option value="協理">協理</option>
            <option value="經理">經理</option>
            <option value="科長">科長</option>
            <option value="副理">副理</option>
            {/* 其他選項 */}
          </select>
          <div className="absolute right-2 top-10 pointer-events-none">▼</div>
          {errors.job && (
            <p className="text-red-500 text-sm mt-1">{errors.job.message}</p>
          )}
        </div>

        {/* 專案群組 */}
        <div>
          <label className="block font-semibold mb-2">專案群組</label>
          <input
            type="text"
            {...register("projectGroup")}
            className="w-full p-2 border rounded"
            placeholder="輸入專案群組"
          />
        </div>

        {/* 員工編號 */}
        <div>
          <label className="block font-semibold mb-2">
            員工編號 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("empId", { required: "請輸入員工編號" })}
            className="w-full p-2 border rounded"
            placeholder="輸入員工編號"
          />
          {errors.empId && (
            <p className="text-red-500 text-sm mt-1">{errors.empId.message}</p>
          )}
        </div>

        {/* 姓名 */}
        <div>
          <label className="block font-semibold mb-2">姓名</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 border rounded"
            placeholder="輸入姓名"
          />
        </div>

        {/* 其他欄位：如果需要 phone 或 userId 等也可以加上 */}

        {/* 送出按鈕 */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded font-extrabold hover:bg-green-600"
        >
          送出表單
        </button>

        <h6 id="channel-id" className="text-sm bg-gray-200 p-2 mt-4">
          channelId : 2007028490-user:{storedUserId}
        </h6>
      </form>
    </div>
  );
}
