import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import type { Vote } from "@/types/Vote";

export const VoteApiConfig = {
    index: '/vote',
    byId: (id: number) => `/vote/${id}`,
    checkUserVoted: (id: number, userId: number) => `/vote/${id}/checkUserVoted/${userId}`,
    participateIn: (id: number) => `/vote/${id}/participateIn`,
    userCreated: (userId: number) => `/vote/user/created/${userId}`,
    userVoted: (userId: number) => `/vote/user/voted/${userId}`,
};

// 獲取所有投票
export const getAllVotes = async (userId?: number): Promise<AxiosResponse<Vote[]>> => {
    try {
        return await apiClient.get<Vote[]>(VoteApiConfig.index, { params: { userId } });
    } catch (error) {
        console.error('獲取所有投票時發生錯誤:', error);
        throw error;
    }
};

// 獲取單個投票
export const getVoteById = async (id: number): Promise<AxiosResponse<Vote>> => {
    try {
        return await apiClient.get<Vote>(VoteApiConfig.byId(id));
    } catch (error) {
        console.error('獲取單個投票時發生錯誤:', error);
        throw error;
    }
};

// 刪除投票
export const deleteVote = async (id: number): Promise<AxiosResponse<void>> => {
    try {
        return await apiClient.delete<void>(VoteApiConfig.byId(id));
    } catch (error) {
        console.error('刪除投票時發生錯誤:', error);
        throw error;
    }
};
