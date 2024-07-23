"use client";
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import type { CommunityPost } from "@/types/CommunityPost";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import Link from "next/link";
import { format } from "date-fns";
import DataManagementTable from "../common/DataManagementTable";
import {
  deleteCommunityPost,
  getAllCommunityPosts,
} from "@/api/management/communityPost";
import { EyeIcon } from "@heroicons/react/24/outline";

const CommunityPostList = () => {
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      setLoading(true);
      try {
        const response = await getAllCommunityPosts();
        const communityPostsData = response.data.posts;
        const communityPostsWithDate = communityPostsData.map(
          (communityPost: CommunityPost) => ({
            ...communityPost,
            createdAt: communityPost.createdAt,
          })
        );
        setCommunityPosts(communityPostsWithDate);
        setError(null);
      } catch (error) {
        setError("取得社區貼文時發生錯誤。");
        console.error("取得社區貼文時發生錯誤:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityPosts();
  }, []);

  const handleDeleteCommunityPost = async (id: number) => {
    setLoading(true);
    try {
      await deleteCommunityPost(id);
      setCommunityPosts((prevCommunityPosts) =>
        prevCommunityPosts.filter((a) => a.id !== id)
      );
      setError(null);
    } catch (error) {
      setError(`刪除社區貼文時發生錯誤 ${id}。`);
      console.error(`刪除社區貼文時發生錯誤 ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "標題",
      flex: 2,
      cellClassName: "font-semibold  focus-within:outline-none",
    },
    {
      field: "author.username",
      headerName: "作者",
      flex: 1,
      cellClassName: "focus-within:outline-none",
      renderCell: (params: { row: { author: { username: string } } }) => (
        <span>{params.row.author.username}</span>
      ),
    },
    {
      field: "views",
      headerName: "瀏覽數",
      flex: 1,
      cellClassName: "focus-within:outline-none",
    },
    {
      field: "likes",
      headerName: "點讚數",
      flex: 1,
      cellClassName: "focus-within:outline-none",
    },
    {
      field: "createdAt",
      headerName: "創建日期",
      flex: 1,
      cellClassName: "focus-within:outline-none",
      renderCell: (params: { row: { createdAt: string } }) => (
        <span>
          {format(new Date(params.row.createdAt), "yyyy-MM-dd HH:mm")}
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
            <Link href={`/communityPostManagement/view/${params.row.id}`}>
              <EyeIcon className="size-6" />
            </Link>
          </IconButton>
        </div>
      ),
    },
  ];

  const sortedCommunityPosts = communityPosts.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <DataManagementTable
      initialColumns={columns}
      data={sortedCommunityPosts}
      loading={loading}
      error={error}
      sortField="title"
      sortOrder="asc"
    />
  );
};

export default CommunityPostList;
