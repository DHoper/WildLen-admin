import { User } from "./User";
import { Image } from "./Common";

export interface CommunityPost {
    id: number;
    title: string;
    authorId: number;
    content: string;
    topicTags: string[];
    likes: number;
    views: number;
    isEdit: boolean;
    images: Image[];
    createdAt: string;
    updatedAt: string;
    author: User;
    comments: Comment[];
}

export interface Comment {
    id: number;
    postId: number;
    authorId: number;
    content: string;
    likes: number;
    createdAt: string;
    updatedAt: string;
    author: User;
}

export interface CreateCommunityPostData {
    title: string;
    authorId: number;
    content: string;
    topicTags: string[];
    imageIds: number[];
}
