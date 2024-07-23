"use client";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { deleteArticle, getArticle } from "@/api/management/article";
import { Article } from "@/types/Article";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { Delete, KeyboardBackspace } from "@mui/icons-material";
import dynamic from "next/dynamic";

const ArticleEditPage = ({ params }: { params: { id: string } }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const id = params.id;

  const Editor = useMemo(() => {
    return dynamic(() => import("@/components/editor/Editor"), {
      loading: () => (
        <div className="my-4 flex w-full items-center justify-center">
          <CircularProgress />
        </div>
      ),

      ssr: false,
    });
  }, []);

  const handleDeleteArticle = async (id: number) => {
    try {
      await deleteArticle(id);
    } catch (error) {
      console.error(`刪除文章時發生錯誤 ${id}:`, error);
    }
  };

  useEffect(() => {
    if (id) {
      getArticle(Number(id))
        .then((response) => setArticle(response.article))
        .catch((error) => console.error("Error fetching article:", error));
    }
  }, [id]);

  return (
    <div className="min-h-screen w-full px-8 pb-8 pt-4 text-black">
      <Link href={"/articleManagement"}>
        <Button
          variant="contained"
          startIcon={<KeyboardBackspace fontSize="medium" />}
          sx={{ marginBottom: 2 }}
        >
          返回
        </Button>
      </Link>

      <Card className="mx-auto w-full max-w-4xl bg-transparent p-8 pt-2">
        <IconButton
          className="-mr-4 ml-auto block p-0"
          color="error"
          onClick={() => handleDeleteArticle(Number(id))}
        >
          <Delete />
        </IconButton>
        <Typography
          className="mx-auto w-fit text-2xl font-semibold"
          gutterBottom
        >
          編輯文章
        </Typography>
        {article ? (
          <Editor mode="edit" article={article} />
        ) : (
          <Typography className="mt-4 text-center">載入中...</Typography>
        )}
      </Card>
    </div>
  );
};

export default ArticleEditPage;
