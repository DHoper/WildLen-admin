import React from "react";
import { Typography, Container } from "@mui/material";
import CommunityPostList from "@/components/community/CommunityPostList";

const CommunityPostPage: React.FC = () => {
  return (
    <Container maxWidth="lg" className="flex h-full flex-col py-4">
      <div className="flex items-end justify-between p-2 pb-4">
        <Typography className="text-2xl font-semibold" gutterBottom>
          論壇社區貼文管理
        </Typography>
      </div>
      <CommunityPostList />
    </Container>
  );
};

export default CommunityPostPage;
