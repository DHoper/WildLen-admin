// pages/ArticlePage.tsx
import React, { Suspense } from "react";
import { Typography, Container, Box, Fab, Skeleton } from "@mui/material";
import ArticleList from "@/components/article/ArticleList";
import Link from "next/link";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";

const ArticlePage: React.FC = () => {
  return (
    <Container maxWidth="lg" className="flex h-full flex-col py-4">
      <div className="flex items-end justify-between p-2 pb-4">
        <Typography className="text-2xl font-semibold" gutterBottom>
          論壇文章管理
        </Typography>
        <Link href="/articleManagement/create">
          <Fab size="small" color="primary" aria-label="add">
            <PlusIcon className="size-8 text-white transition-all hover:rotate-90" />
          </Fab>
        </Link>
      </div>

      <ArticleList />
    </Container>
  );
};

export default ArticlePage;
