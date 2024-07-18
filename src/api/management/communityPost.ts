import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import type { CommunityPost, Comment, CreateCommunityPostData } from "@/types/CommunityPost";

export const CommunityApiConfig = {
    index: '/community',
    all: (startFromLast: number) => `/community/all/${startFromLast}`,
    byId: (id: number) => `/community/${id}`,
    byAuthorId: (authorId: number) => `/community/user/${authorId}`,
    comments: (postId: number) => `/community/comments/${postId}`,
    commentById: (id: number) => `/community/comment/${id}`,
    statistics: (id: number, action: string) => `/community/${id}/statistics/${action}`,
};

// 創建社區貼文
export const createCommunityPost = async (data: CreateCommunityPostData): Promise<AxiosResponse<CommunityPost>> => {
    try {
        return await apiClient.post<CommunityPost>(CommunityApiConfig.index, data);
    } catch (error) {
        console.error('創建社區貼文時發生錯誤:', error);
        throw error;
    }
};

// 獲取所有社區貼文
export const getAllCommunityPosts = async (startFromLast: number): Promise<AxiosResponse<{ posts: CommunityPost[], totalCount: number }>> => {
    try {
        return await apiClient.get<{ posts: CommunityPost[], totalCount: number }>(CommunityApiConfig.all(startFromLast));
    } catch (error) {
        console.error('獲取所有社區貼文時發生錯誤:', error);
        throw error;
    }
};

// 根據ID獲取單個社區貼文
export const getCommunityPostById = async (id: number): Promise<AxiosResponse<CommunityPost>> => {
    try {
        return await apiClient.get<CommunityPost>(CommunityApiConfig.byId(id));
    } catch (error) {
        console.error('獲取單個社區貼文時發生錯誤:', error);
        throw error;
    }
};

// 根據作者ID獲取用戶所有社區貼文
export const getUserCommunityPosts = async (authorId: number): Promise<AxiosResponse<CommunityPost[]>> => {
    try {
        return await apiClient.get<CommunityPost[]>(CommunityApiConfig.byAuthorId(authorId));
    } catch (error) {
        console.error('獲取用戶所有社區貼文時發生錯誤:', error);
        throw error;
    }
};

// 更新社區貼文
export const updateCommunityPost = async (id: number, data: CreateCommunityPostData): Promise<AxiosResponse<CommunityPost>> => {
    try {
        return await apiClient.put<CommunityPost>(CommunityApiConfig.byId(id), data);
    } catch (error) {
        console.error('更新社區貼文時發生錯誤:', error);
        throw error;
    }
};

// 刪除社區貼文
export const deleteCommunityPost = async (id: number): Promise<AxiosResponse<void>> => {
    try {
        return await apiClient.delete<void>(CommunityApiConfig.byId(id));
    } catch (error) {
        console.error('刪除社區貼文時發生錯誤:', error);
        throw error;
    }
};

// 更新帖子統計數據
export const setCommunityPostStats = async (id: number, action: string): Promise<AxiosResponse<void>> => {
    try {
        return await apiClient.put<void>(CommunityApiConfig.statistics(id, action));
    } catch (error) {
        console.error('更新帖子統計數據時發生錯誤:', error);
        throw error;
    }
};

// 獲取評論
export const getComments = async (postId: number): Promise<AxiosResponse<Comment[]>> => {
    try {
        return await apiClient.get<Comment[]>(CommunityApiConfig.comments(postId));
    } catch (error) {
        console.error('獲取評論時發生錯誤:', error);
        throw error;
    }
};

// 創建評論
export const createComment = async (postId: number, data: CreateCommentData): Promise<AxiosResponse<Comment>> => {
    try {
        return await apiClient.post<Comment>(CommunityApiConfig.comments(postId), data);
    } catch (error) {
        console.error('創建評論時發生錯誤:', error);
        throw error;
    }
};

// 刪除評論
export const deleteComment = async (id: number): Promise<AxiosResponse<void>> => {
    try {
        return await apiClient.delete<void>(CommunityApiConfig.commentById(id));
    } catch (error) {
        console.error('刪除評論時發生錯誤:', error);
        throw error;
    }
};
