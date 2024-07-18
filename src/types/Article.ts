export interface Article {
    id: number;
    title: string;
    subTitle: string;
    createdAt: string;
    views: number;
    likes: number;
    content: any;
    topicTags: string[];
    coverImage: string;
}

export interface Comment {
    id: number;
    articleId: number;
    authorId: number;
    content: any;
    likes: number;
}

export interface CreateArticleData {
    id?: number
    title: string;
    subTitle: string;
    topicTags: string[];
    coverImage: string;
    content: any;
    imageIds?: number[]
}

export interface CreateCommentData {
    articleId: number;
    authorId: number;
    content: any;
}