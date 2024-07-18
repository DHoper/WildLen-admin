// pages/ArticlePage.tsx
import React, { Suspense } from "react";
import { Typography, Container, Box, Fab, Skeleton } from "@mui/material";
import ArticleList from "@/components/article/ArticleList";
import Link from "next/link";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";

const ArticlePage: React.FC = () => {
  return (
    <Container maxWidth="lg" className="py-4 h-full flex flex-col">
      <div className="flex justify-between items-end p-2 pb-4">
        <Typography className="text-2xl font-semibold" gutterBottom>
          文章管理
        </Typography>
        <Link href="/articleManagement/create">
          <Fab size="small" color="primary" aria-label="add">
            <PlusIcon className="text-white w-8 h-8 hover:rotate-90 transition-all" />
          </Fab>
        </Link>
      </div>

      <ArticleList />
    </Container>
  );
};

export default ArticlePage;
