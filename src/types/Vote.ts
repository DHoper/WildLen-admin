import { User } from "./User";

export interface Vote {
    id: number;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    participantCount: number;
    isEnd: boolean;
    options: VoteOption[];
    userVotes: UserVote[];
    author: User;
    createdAt: Date;
    updatedAt: Date;
    userHasVoted?: boolean;
}

export interface VoteOption {
    id: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserVote {
    id: number;
    userId: number;
    voteId: number;
    voteOptionId: number;
    createdAt: Date;
    updatedAt: Date;
}
