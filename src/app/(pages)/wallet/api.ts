'use client';

import axiosInstance from "@/app/lib/axios";
import { AllUsers } from "@/app/types/user";


export const getAllUsers = async (
  keyword?: string
): Promise<AllUsers> => {
  const query = new URLSearchParams();
  if (keyword) {
    query.append("type", "wallet");
    query.append("keyword", keyword);
  }

  const res = await axiosInstance.get(`/users?${query.toString()}`);
  return res.data;
};


export const createUser = async (data: {
  name: string;
  account_number: string;
  bank: string;
}) => {
  const res = await axiosInstance.post('/users', data);
  return res.data;
};

export const updateUser = async (id: string, data: { name: string }) => {
  const res = await axiosInstance.patch(`/users/${id}`, data);
  return res.data;
};

export const transferSaldo = async (data: { senderId: string; recipientName: string; amount: number }) => {
  const res = await axiosInstance.post(`users/transfer`, data);
  return res.data;
};

export const topUpUser = async (id: string, data: { amount: number }) => {
  const res = await axiosInstance.post(`users/topup`, { id: id, amount: data.amount });
  return res.data;
};

