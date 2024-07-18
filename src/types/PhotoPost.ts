import { User } from "./User";
import { Image } from "./Common";

export interface PhotoPost {
    id: number;
    title: string;
    likes: number;
    views: number;
    description: string;
    location: string;
    geometry: any; // 根據實際的 GeoJSON 類型進行調整
    authorId: number;
    isEdit: boolean;
    images: Image[];
    createdAt: Date;
    updatedAt: Date;
    author: User;
    comments: Comment[];
}

export interface Comment {
    id: number;
    postId: number;
    authorId: number;
    content: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
    author: User;
}

export interface CreatePhotoPostData {
    title: string;
    likes: number;
    views: number;
    description: string;
    location: string;
    geometry: any; // 根據實際的 GeoJSON 類型進行調整
    authorId: number;
    isEdit: boolean;
    imageIds: number[];
}
