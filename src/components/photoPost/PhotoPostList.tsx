"use client";
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import type { PhotoPost } from "@/types/PhotoPost";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import Link from "next/link";
import { format } from "date-fns";
import DataManagementTable from "../common/DataManagementTable";
import { deletePhotoPost, getAllPhotoPosts } from "@/api/management/photoPost";
import { EyeIcon } from "@heroicons/react/24/outline";

const PhotoPostList: React.FC = () => {
  const [photoPosts, setPhotoPosts] = useState<PhotoPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotoPosts = async () => {
      setLoading(true);
      try {
        const photoPostsData = await getAllPhotoPosts();

        const photoPostsWithDate = photoPostsData.map(
          (photoPost: PhotoPost) => ({
            ...photoPost,
            createdAt: photoPost.createdAt,
          })
        );
        setPhotoPosts(photoPostsWithDate);
        setError(null);
      } catch (error) {
        setError("取得照片帖子時發生錯誤。");
        console.error("取得照片帖子時發生錯誤:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoPosts();
  }, []);

  const handleDeletePhotoPost = async (id: number) => {
    setLoading(true);
    try {
      await deletePhotoPost(id);
      setPhotoPosts((prevPhotoPosts) =>
        prevPhotoPosts.filter((a) => a.id !== id)
      );
      setError(null);
    } catch (error) {
      setError(`刪除照片帖子時發生錯誤 ${id}。`);
      console.error(`刪除照片帖子時發生錯誤 ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "標題",
      flex: 1,
      cellClassName: "font-semibold  focus-within:outline-none",
    },
    {
      field: "location",
      headerName: "地點",
      flex: 1,
      cellClassName: "focus-within:outline-none",
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
            <Link href={`/photoPostManagement/view/${params.row.id}`}>
              <EyeIcon className="size-6" />
            </Link>
          </IconButton>
        </div>
      ),
    },
  ];

  const sortedPhotoPosts = photoPosts.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <DataManagementTable
      initialColumns={columns}
      data={sortedPhotoPosts}
      loading={loading}
      error={error}
      sortField="title"
      sortOrder="asc"
    />
  );
};

export default PhotoPostList;
