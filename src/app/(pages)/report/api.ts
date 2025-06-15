import axiosInstance from "@/app/lib/axios";
import { AllUsers } from "@/app/types/user";

export const getAllUsers = async (
  type?: string,
  keyword?: string,
  startDate?: string,
  endDate?: string
): Promise<AllUsers> => {
  const query = new URLSearchParams();

  if (type) query.append("type", type);
  if (keyword) query.append("keyword", keyword);
  if (startDate) query.append("startDate", startDate);
  if (endDate) query.append("endDate", endDate);

  const res = await axiosInstance.get(`/users?${query.toString()}`);
  return res.data;
};
