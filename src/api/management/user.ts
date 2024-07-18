import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import type { User, CreateUserData, UpdateUserData } from "@/types/User";

export const UserApiConfig = {
    user: '/user',
    users: '/users',
    userById: (userId: number) => `/user/${userId}`,
    login: '/user/login',
    checkEmail: (email: string) => `/user/checkEmail/${email}`,
};

// 註冊用戶
export const registerUser = async (data: CreateUserData): Promise<AxiosResponse<User>> => {
    try {
        return await apiClient.post<User>(UserApiConfig.user, data);
    } catch (error) {
        console.error('註冊用戶時發生錯誤:', error);
        throw error;
    }
};

// 根據 ID 獲取用戶
export const getUserById = async (userId: number): Promise<AxiosResponse<User>> => {
    try {
        return await apiClient.get<User>(UserApiConfig.userById(userId));
    } catch (error) {
        console.error('根據 ID 獲取用戶時發生錯誤:', error);
        throw error;
    }
};

// 獲取所有用戶
export const getAllUsers = async (): Promise<AxiosResponse<User[]>> => {
    try {
        return await apiClient.get<User[]>(UserApiConfig.users);
    } catch (error) {
        console.error('獲取所有用戶時發生錯誤:', error);
        throw error;
    }
};

// 刪除用戶
export const deleteUser = async (id: number): Promise<AxiosResponse<void>> => {
    try {
        return await apiClient.delete<void>(UserApiConfig.userById(id));
    } catch (error) {
        console.error('刪除用戶時發生錯誤:', error);
        throw error;
    }
};

// 更新用戶
export const updateUser = async (data: UpdateUserData): Promise<AxiosResponse<User>> => {
    try {
        return await apiClient.put<User>(UserApiConfig.user, data);
    } catch (error) {
        console.error('更新用戶時發生錯誤:', error);
        throw error;
    }
};

// 確認信箱是否重複
export const checkEmail = async (email: string): Promise<AxiosResponse<{ exists: boolean }>> => {
    try {
        return await apiClient.get<{ exists: boolean }>(UserApiConfig.checkEmail(email));
    } catch (error) {
        console.error('確認信箱時發生錯誤:', error);
        throw error;
    }
};
