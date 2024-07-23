import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import type { User, CreateUserData, UpdateUserData } from "@/types/User";

export const UserApiConfig = {
  index: "/auth/users",
  byId: (userId: number) => `/auth/user/${userId}`,
  password: (userId: number) => `/auth/user/password/${userId}`,
};

// 註冊用戶
export const registerUser = async (
  data: CreateUserData
): Promise<AxiosResponse<User>> => {
  try {
    return await apiClient.post<User>(UserApiConfig.index, data);
  } catch (error) {
    console.error("註冊用戶時發生錯誤:", error);
    throw error;
  }
};

// 根據 ID 獲取用戶
export const getUserById = async (userId: number) => {
  try {
    const response = await apiClient.get(UserApiConfig.byId(userId));
    return response.data.user;
  } catch (error) {
    console.error("根據 ID 獲取用戶時發生錯誤:", error);
    throw error;
  }
};

// 獲取所有用戶
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get(UserApiConfig.index);

    return response.data.users;
  } catch (error) {
    console.error("獲取所有用戶時發生錯誤:", error);
    throw error;
  }
};

// 更新用戶
export const updateUser = async (
  id: number,
  data: UpdateUserData
): Promise<AxiosResponse<User>> => {
  try {
    return await apiClient.put<User>(UserApiConfig.byId(id), data);
  } catch (error) {
    console.error("更新用戶時發生錯誤:", error);
    throw error;
  }
};

export const updatePassword = async (
  id: number,
  newPassword: string
): Promise<AxiosResponse<User>> => {
  try {
    console.log(newPassword,777);
    
    return await apiClient.post<User>(UserApiConfig.password(id), {newPassword});
  } catch (error) {
    console.error("更新用戶密碼時發生錯誤:", error);
    throw error;
  }
};

// 刪除用戶
export const deleteUser = async (id: number): Promise<AxiosResponse<void>> => {
  try {
    return await apiClient.delete<void>(UserApiConfig.byId(id));
  } catch (error) {
    console.error("刪除用戶時發生錯誤:", error);
    throw error;
  }
};