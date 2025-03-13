"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ 定義表單 schema
const formSchema = z.object({
  department: z.enum(
    [
      "D64業務部",
      "D78資訊中心",
      "T01四海站",
      "T02南雅站",
      "T03中和站",
      "T04新店站",
      "T05木柵站",
    ],
    { message: "請選擇部門" }
  ),
  position: z.string().optional(),
  projectGroup: z.string().optional(),
  employeeId: z.string().min(1, { message: "員工編號為必填" }),
  name: z.string().optional(),
});

// ✅ 定義表單類型
type FormData = z.infer<typeof formSchema>;

export default function TaipeiBusBinding() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  /*   const [userId, setUserId] = useState<string | null>(null); */

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
            {...register("department")}
            className="w-full p-2 border rounded bg-white appearance-none pr-8"
          >
            <option value="">請選擇公司</option>
            <option value="2007028490">臺北客運</option>
            <option value="200702841">首都客運</option>
          </select>
          {/* 模擬下拉箭頭 */}
          <div className="absolute right-2 top-10 pointer-events-none">▼</div>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* 部門 (必填) */}
        <div className="relative">
          <label className="block font-semibold mb-2">
            部門 <span className="text-red-500">*</span>
          </label>
          <select
            {...register("department")}
            className="w-full p-2 border rounded bg-white appearance-none pr-8"
          >
            <option value="">請選擇部門</option>
            <option value="D64業務部">D64業務部</option>
            <option value="D78資訊中心">D78資訊中心</option>
            <option value="T01四海站">T01四海站</option>
            <option value="T02南雅站">T02南雅站</option>
            <option value="T03中和站">T03中和站</option>
            <option value="T04新店站">T04新店站</option>
            <option value="T05木柵站">T05木柵站</option>
          </select>
          {/* 模擬下拉箭頭 */}
          <div className="absolute right-2 top-10 pointer-events-none">▼</div>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* 職稱 */}
        <div className="relative">
          <label className="block font-semibold mb-2">職稱</label>
          <select
            {...register("department")}
            className="w-full p-2 border rounded bg-white appearance-none pr-8"
          >
            <option value="">請選擇職稱</option>
            <option value="協理">協理</option>
            <option value="經理">經理</option>
            <option value="科長">科長</option>
            <option value="副理">副理</option>
            <option value="襄理">襄理</option>
            <option value="課長">課長</option>
            <option value="主任">主任</option>
            <option value="股長">股長</option>
            <option value="場站主管">場站主管</option>
            <option value="場站職員">場站職員</option>
            <option value="內勤職員">內勤職員</option>
          </select>
          {/* 模擬下拉箭頭 */}
          <div className="absolute right-2 top-10 pointer-events-none">▼</div>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* 專案群組 (標題變成橘色) */}
        <div>
          <label className="block font-semibold mb-2 ">專案群組</label>
          <input
            type="text"
            {...register("projectGroup")}
            className="w-full p-2 border rounded"
            placeholder="輸入專案群組"
          />
        </div>

        {/* 員工編號 (必填) */}
        <div>
          <label className="block font-semibold mb-2">
            員工編號 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("employeeId")}
            className="w-full p-2 border rounded"
            placeholder="輸入員工編號"
          />
          {errors.employeeId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.employeeId.message}
            </p>
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

        {/* 送出按鈕 */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded font-extrabold hover:bg-green-600"
        >
          送出表單
        </button>
        {/* 表單下方的 channel id */}
        <h6 id="channel-id" className="text-sm bg-gray-200 p-2 mt-4">
          channelId : 20089333-user:id
        </h6>
      </form>
    </div>
  );
}
