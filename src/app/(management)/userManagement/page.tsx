// pages/ArticlePage.tsx
import React from "react";
import { Typography, Container } from "@mui/material";
import UserList from "@/components/user/UserList";

const ArticlePage: React.FC = () => {
  return (
    <Container maxWidth="lg" className="flex h-full flex-col py-4">
      <div className="flex items-end justify-between p-2 pb-4">
        <Typography className="text-2xl font-semibold" gutterBottom>
          論壇用戶管理
        </Typography>
      </div>
      <UserList />
    </Container>
  );
};

export default ArticlePage;
