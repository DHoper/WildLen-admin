import React from "react";
import { Typography, Container } from "@mui/material";
import PhotoPostList from "@/components/photoPost/PhotoPostList";

const PhotoPostPage: React.FC = () => {
  return (
    <Container maxWidth="lg" className="flex h-full flex-col py-4">
      <div className="flex items-end justify-between p-2 pb-4">
        <Typography className="text-2xl font-semibold" gutterBottom>
          照片牆貼文管理
        </Typography>
      </div>
      <PhotoPostList />
    </Container>
  );
};

export default PhotoPostPage;
