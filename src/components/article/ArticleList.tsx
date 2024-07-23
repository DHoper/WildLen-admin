"use client";
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { getAllArticle, deleteArticle } from "@/api/management/article";
import type { Article } from "@/types/Article";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import Link from "next/link";
import { format } from "date-fns";
import DataManagementTable from "../common/DataManagementTable";

interface ArticleWithDate extends Omit<Article, "createdAt"> {
  createdAt: string;
}

const ArticleManagement: React.FC = () => {
  const [articles, setArticles] = useState<ArticleWithDate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const articlesData = await getAllArticle();
        const articlesWithDate = articlesData.map((article) => ({
          ...article,
          createdAt: article.createdAt,
        }));
        setArticles(articlesWithDate);
        setError(null);
      } catch (error) {
        setError("取得文章時發生錯誤。");
        console.error("取得文章時發生錯誤:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "標題",
      flex: 2,
      cellClassName: "font-semibold  focus-within:outline-none",
    },
    {
      field: "topicTags",
      headerName: "標籤",
      filterable: true,
    },
    {
      field: "views",
      headerName: "瀏覽數",
      cellClassName: "focus-within:outline-none",
    },
    {
      field: "likes",
      headerName: "點讚數",
      cellClassName: "focus-within:outline-none",
    },
    {
      field: "createdAt",
      headerName: "創建日期",
      flex: 1,
      cellClassName: "focus-within:outline-none",
      renderCell: (params: { row: { createdAt: string } }) => (
        <span>
          {format(new Date(params.row.createdAt), "yyyy-MM-dd HH:MM")}
        </span>
      ),
    },
    {
      field: "操作",
      headerName: "",
      cellClassName: "focus-within:outline-none",
      renderCell: (params: { row: { id: number } }) => (
        <div className="flex h-full items-center justify-around">
          <IconButton
            color="primary"
            onClick={(event) => event.stopPropagation()}
          >
            <Link href={`/articleManagement/edit/${params.row.id}`}>
              <Edit />
            </Link>
          </IconButton>
        </div>
      ),
    },
  ];

  const sortedArticles = articles.sort((a, b) =>
    a.title.localeCompare(b.title)
  ); // 示例排序

  return (
    <DataManagementTable
      initialColumns={columns}
      data={sortedArticles}
      loading={loading}
      error={error}
      sortField="title"
      sortOrder="asc"
    />
  );
};

export default ArticleManagement;
