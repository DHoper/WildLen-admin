// pages/edit/[id].tsx

import { GetServerSideProps, NextPage } from "next";
import Editor from "@/components/editor/Editor";
import { Article } from "@/types/Article";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { Card, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

interface EditArticlePageProps {
  article?: Article; // 文章類型，根據你的定義調整
}

const ArticleEditPage = ({ params }: { params: { id: string } }) => {
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    
  }, []);

  return (
    <div className="w-full min-h-screen pt-4 pb-8 px-8 text-black">
      <Link href={"/articleManagement"}>
        <ArrowLongLeftIcon className="h-8 w-8 mb-4" />
      </Link>
      <Card className="w-[90%] mx-auto p-8 bg-transparent">
        <Typography
          className="w-fit mx-auto text-2xl font-semibold"
          gutterBottom
        >
          新增文章
        </Typography>
        <Editor mode="edit" article={article} />
      </Card>
    </div>
  );
};

{
  /* export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params; // 從路由參數獲取文章 ID

    // 模擬從 API 獲取文章數據，這裡可以替換為實際的數據獲取邏輯
    // 例如使用 fetch 或者調用後端 API
    const response = await fetch(`https://api.example.com/articles/${id}`);
    const data = await response.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    const article: Article = {
        id: data.id,
        title: data.title,
        subTitle: data.subTitle,
        createdAt: data.createdAt,
        views: data.views,
        likes: data.likes,
        content: data.content,
        topicTags: data.topicTags,
        coverImage: data.coverImage,
    };

    return {
        props: {
            article,
        },
    };
}; */
}

export default ArticleEditPage;
