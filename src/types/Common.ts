export interface Image {
    id: number;
    url: string;
    publicId: string; 
    createdAt: Date;
    updatedAt: Date;
    photoPostId?: number;
    communityPostId?: number;
    articleId?: number;
}