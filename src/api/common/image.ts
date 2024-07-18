import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";

export interface ImageUploadResponse {
    id: number;
    url: string;
    publicId: string;
}

export const ApiConfig = {
    upload: (dir: string) => `/image/${dir}`,
    delete: "/image",
};

export const uploadImage = async (dir: string, file: File): Promise<ImageUploadResponse[]> => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await apiClient.post(ApiConfig.upload(dir), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const deleteImage = async (identifier: string): Promise<AxiosResponse<void>> => {
    try {
        let dataToSend: { publicId?: string; url?: string } = {};

        // Determine if identifier is publicId or url
        if (identifier.includes("http")) {
            // It's a URL
            dataToSend.url = identifier;
        } else {
            // It's a publicId
            dataToSend.publicId = identifier;
        }

        const response = await apiClient.delete<void>(ApiConfig.delete, {
            data: dataToSend,
        });

        return response;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};
