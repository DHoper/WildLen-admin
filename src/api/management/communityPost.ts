import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import type {
  CommunityPost,
  Comment,
} from "@/types/CommunityPost";

export const CommunityApiConfig = {
  index: "/communityPost",
  all: "/communityPost/all/0",
  byId: (id: number) => `/communityPost/${id}`,
  comments: (postId: number) => `/communityPost/comments/${postId}`,
  commentById: (id: number) => `/communityPost/comment/${id}`,

};

// 獲取所有社區貼文
export const getAllCommunityPosts = async () => {
  try {
    return await apiClient.get(CommunityApiConfig.all);
  } catch (error) {
    console.error("獲取所有社區貼文時發生錯誤:", error);
    throw error;
  }
};

// 根據ID獲取單個社區貼文
export const getCommunityPostById = async (
  id: number
): Promise<AxiosResponse<CommunityPost>> => {
  try {
    return await apiClient.get<CommunityPost>(CommunityApiConfig.byId(id));
  } catch (error) {
    console.error("獲取單個社區貼文時發生錯誤:", error);
    throw error;
  }
};

// 刪除社區貼文
export const deleteCommunityPost = async (
  id: number
): Promise<AxiosResponse<void>> => {
  try {
    return await apiClient.delete<void>(CommunityApiConfig.byId(id));
  } catch (error) {
    console.error("刪除社區貼文時發生錯誤:", error);
    throw error;
  }
};

// 獲取評論
export const getComments = async (
  postId: number
): Promise<AxiosResponse<Comment[]>> => {
  try {
    return await apiClient.get<Comment[]>(CommunityApiConfig.comments(postId));
  } catch (error) {
    console.error("獲取評論時發生錯誤:", error);
    throw error;
  }
};

// 刪除評論
export const deleteComment = async (
  id: number
): Promise<AxiosResponse<void>> => {
  try {
    return await apiClient.delete<void>(CommunityApiConfig.commentById(id));
  } catch (error) {
    console.error("刪除評論時發生錯誤:", error);
    throw error;
  }
};
