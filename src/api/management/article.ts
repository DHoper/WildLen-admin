import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import type { Article, Comment, CreateArticleData } from "@/types/Article";

export const ApiConfig = {
    index: '/article',
    byId: (id: number) => `/article/${id}`,
    comments: (articleId: number) => `/article/${articleId}/comments`,
};

export const createArticle = async (data: CreateArticleData): Promise<AxiosResponse<Article>> => {
    try {
        return await apiClient.post<Article>(ApiConfig.index, data);
    } catch (error) {
        console.error('Error creating article:', error);
        throw error;
    }
};

export const updateArticle = async (id: number, data: CreateArticleData): Promise<AxiosResponse<Article>> => {
    try {
        // Assuming data includes images with publicId after upload
        return await apiClient.put<Article>(ApiConfig.byId(id), data);
    } catch (error) {
        console.error('Error updating article:', error);
        throw error;
    }
};

export const deleteArticle = async (id: number): Promise<AxiosResponse<void>> => {
    try {
        return await apiClient.delete<void>(ApiConfig.byId(id));
    } catch (error) {
        console.error('Error deleting article:', error);
        throw error;
    }
};

export const getAllArticle = async (): Promise<Article[]> => {
    try {
        const response = await apiClient.get(ApiConfig.index);
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching all articles:', error);
        throw error;
    }
};

export const getArticle = async (id: number): Promise<AxiosResponse<Article>> => {
    try {
        return await apiClient.get<Article>(ApiConfig.byId(id));
    } catch (error) {
        console.error('Error fetching article:', error);
        throw error;
    }
};

// export const createComment = async (data: CreateCommentData): Promise<AxiosResponse<Comment>> => {
//     try {
//         return await apiClient.post<Comment>(ApiConfig.comments(data.articleId), data);
//     } catch (error) {
//         console.error('Error creating comment:', error);
//         throw error;
//     }
// };
