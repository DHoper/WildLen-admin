export interface User {
    id: number;
    email: string;
    username: string;
    profile?: Profile;
    createdAt: Date;
    updatedAt: Date;
}

export interface Profile {
    id: number;
    userId: number;
    selectedAvatarIndex: number;
    selectedTags: string[];
    intro?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserData {
    email: string;
    password: string;
    username: string;
    selectedAvatarIndex: number;
    selectedTags: string[];
    intro?: string;
}

export interface UpdateUserData {
    email: string;
    username: string;
    profile: {
        selectedAvatarIndex: number;
        selectedTags: string[];
        intro?: string;
    };
}
