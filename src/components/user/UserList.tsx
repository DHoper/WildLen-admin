"use client";
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import type { User } from "@/types/User";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { Edit } from "@mui/icons-material";
import { format } from "date-fns";
import { getAllUsers } from "@/api/management/user";
import DataManagementTable from "../common/DataManagementTable";

interface UserWithDate extends Omit<User, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserWithDate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await getAllUsers();
        const usersData = users.map((user: User) => ({
          ...user,
          createdAt: user.createdAt.toString(),
          updatedAt: user.updatedAt.toString(),
        }));
        setUsers(usersData);
        setError(null);
      } catch (error) {
        setError("取得用戶時發生錯誤。");
        console.error("取得用戶時發生錯誤:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "用戶名",
      flex: 2,
      cellClassName: "font-semibold  focus-within:outline-none",
    },
    {
      field: "email",
      headerName: "信箱",
      flex: 2,
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
      headerName: "操作",
      cellClassName: "focus-within:outline-none",
      renderCell: (params: { row: { id: number } }) => (
        <div className="flex h-full items-center justify-around">
          <IconButton
            color="primary"
            onClick={(event) => event.stopPropagation()}
          >
            <Link href={`/userManagement/edit/${params.row.id}`}>
              <Edit />
            </Link>
          </IconButton>
        </div>
      ),
    },
  ];

  const sortedUsers = users.sort((a, b) =>
    a.username.localeCompare(b.username)
  );

  return (
    <DataManagementTable
      initialColumns={columns}
      data={sortedUsers}
      loading={loading}
      error={error}
      sortField="username"
      sortOrder="asc"
    />
  );
};

export default UserManagement;
