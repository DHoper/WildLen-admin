import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import type { PhotoPost, Comment, CreatePhotoPostData } from "@/types/PhotoPost";

export const PhotoApiConfig = {
    index: '/photo',
    byId: (id: number) => `/photo/${id}`,
    byAuthorId: (authorId: number) => `/photo/user/${authorId}`,
    comments: (postId: number) => `/photo/comments/${postId}`,
    commentById: (id: number) => `/photo/comment/${id}`,
    statistics: (id: number, action: string) => `/photo/${id}/statistics/${action}`,
};

// 創建照片帖子
export const createPhotoPost = async (data: CreatePhotoPostData): Promise<AxiosResponse<PhotoPost>> => {
    try {
        return await apiClient.post<PhotoPost>(PhotoApiConfig.index, data);
    } catch (error) {
        console.error('創建照片帖子時發生錯誤:', error);
        throw error;
    }
};

// 獲取所有照片帖子
export const getAllPhotoPosts = async (): Promise<AxiosResponse<PhotoPost[]>> => {
    try {
        return await apiClient.get<PhotoPost[]>(PhotoApiConfig.index);
    } catch (error) {
        console.error('獲取所有照片帖子時發生錯誤:', error);
        throw error;
    }
};

// 根據ID獲取單個照片帖子
export const getPhotoPostById = async (id: number): Promise<AxiosResponse<PhotoPost>> => {
    try {
        return await apiClient.get<PhotoPost>(PhotoApiConfig.byId(id));
    } catch (error) {
        console.error('獲取單個照片帖子時發生錯誤:', error);
        throw error;
    }
};

// 根據作者ID獲取用戶所有照片帖子
export const getUserPhotoPosts = async (authorId: number): Promise<AxiosResponse<PhotoPost[]>> => {
    try {
        return await apiClient.get<PhotoPost[]>(PhotoApiConfig.byAuthorId(authorId));
    } catch (error) {
        console.error('獲取用戶所有照片帖子時發生錯誤:', error);
        throw error;
    }
};

// 更新照片帖子
export const updatePhotoPost = async (id: number, data: CreatePhotoPostData): Promise<AxiosResponse<PhotoPost>> => {
    try {
        return await apiClient.put<PhotoPost>(PhotoApiConfig.byId(id), data);
    } catch (error) {
        console.error('更新照片帖子時發生錯誤:', error);
        throw error;
    }
};

// 刪除照片帖子
export const deletePhotoPost = async (id: number): Promise<AxiosResponse<void>> => {
    try {
        return await apiClient.delete<void>(PhotoApiConfig.byId(id));
    } catch (error) {
        console.error('刪除照片帖子時發生錯誤:', error);
        throw error;
    }
};

// 更新帖子統計數據
export const setPhotoPostStats = async (id: number, action: string): Promise<AxiosResponse<void>> => {
    try {
        return await apiClient.put<void>(PhotoApiConfig.statistics(id, action));
    } catch (error) {
        console.error('更新帖子統計數據時發生錯誤:', error);
        throw error;
    }
};

// 獲取評論
export const getComments = async (postId: number): Promise<AxiosResponse<Comment[]>> => {
    try {
        return await apiClient.get<Comment[]>(PhotoApiConfig.comments(postId));
    } catch (error) {
        console.error('獲取評論時發生錯誤:', error);
        throw error;
    }
};

// 創建評論
export const createComment = async (postId: number, data: CreateCommentData): Promise<AxiosResponse<Comment>> => {
    try {
        return await apiClient.post<Comment>(PhotoApiConfig.comments(postId), data);
    } catch (error) {
        console.error('創建評論時發生錯誤:', error);
        throw error;
    }
};

// 刪除評論
export const deleteComment = async (id: number): Promise<AxiosResponse<void>> => {
    try {
        return await apiClient.delete<void>(PhotoApiConfig.commentById(id));
    } catch (error) {
        console.error('刪除評論時發生錯誤:', error);
        throw error;
    }
};
