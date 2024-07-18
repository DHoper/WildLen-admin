"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridSlots,
  GridSortDirection,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  Paper,
  IconButton,
  useTheme,
  createTheme,
  ThemeProvider,
  LinearProgress,
  Chip,
  Skeleton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { getAllArticle, deleteArticle } from "@/api/management/article";
import type { Article } from "@/types/Article";
import { zhTW } from "@mui/material/locale";
import { format } from "date-fns";

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortModel, setSortModel] = useState<{
    field: string;
    sort: GridSortDirection;
  }>({
    field: "title",
    sort: "asc",
  });
  const [ids, setIds] = useState<GridRowId[]>([]);

  const existingTheme = useTheme();
  const theme = useMemo(
    () =>
      createTheme({}, zhTW, existingTheme, {
        direction: "rtl",
      }),
    [existingTheme]
  );

  const applyFiltersAndSort = useCallback(
    (data: Article[]) => {
      // 應用當前篩選
      let filtered = data;
      if (filter !== "all") {
        filtered = filtered.filter((article) =>
          article.topicTags.includes(filter)
        );
      }

      // 應用當前搜索詞
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // 應用排序
      const { field, sort } = sortModel;
      filtered.sort((a, b) => {
        // 確保字段存在於 Article 類型中
        switch (field) {
          case "title":
            return sort === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          case "views":
            return sort === "asc" ? a.views - b.views : b.views - a.views;
          case "likes":
            return sort === "asc" ? a.likes - b.likes : b.likes - a.likes;
          default:
            return 0;
        }
      });

      setFilteredArticles(filtered);
    },
    [filter, searchTerm, sortModel]
  );

  const handleDeleteArticle = async (id: number) => {
    setLoading(true);
    try {
      await deleteArticle(id);
      setArticles((prevArticles) => prevArticles.filter((a) => a.id !== id));
      applyFiltersAndSort(articles.filter((a) => a.id !== id));
      setError(null);
    } catch (error) {
      setError(`刪除文章時發生錯誤 ${id}，請稍後再試。`);
      console.error(`刪除文章時發生錯誤 ${id}:`, error);
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
      renderCell: (params: { row: { createdAt: Date } }) => (
        <span>{format(params.row.createdAt, "yyyy-MM-dd HH:MM")}</span>
      ),
    },
    {
      field: "操作",
      headerName: "",
      cellClassName: "focus-within:outline-none",
      renderCell: (params: { row: { id: number } }) => (
        <div className="h-full flex justify-around items-center">
          <IconButton
            onClick={() => handleDeleteArticle(params.row.id as number)}
            color="error"
          >
            <Delete />
          </IconButton>
          <IconButton
            onClick={() => console.log("Edit article")}
            color="primary"
          >
            <Edit />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const articlesData = await getAllArticle();
        setArticles(articlesData);
        applyFiltersAndSort(articlesData);
        setError(null);
      } catch (error) {
        setError("取得文章時發生錯誤，請稍後再試。");
        console.error("取得文章時發生錯誤:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [applyFiltersAndSort]);

  return filteredArticles && filteredArticles.length > 0 ? (
    <Paper className="flex-1 w-full p-4 overflow-auto scrollbar-hide bg-transparent">
      <ThemeProvider theme={theme}>
        <DataGrid
          sx={{
            ".mui-yrdy0g-MuiDataGrid-columnHeaderRow": {
              backgroundColor: "rgba(224, 231, 255) !important",
            },
            ".MuiDataGrid-columnHeader:focus-within": {
              outline: "none !important",
            },
          }}
          className="p-2"
          rows={filteredArticles}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: {
                topicTags: false,
              },
            },
          }}
          checkboxSelection={true}
          onRowSelectionModelChange={(ids: GridRowId[]) => setIds(ids)}
          sortingMode="server"
          // sortModel={[sortModel]}
          slots={{
            toolbar: GridToolbar,
            loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          // onSortModelChange={handleSortModelChange}
          pagination
          loading={loading}
          localeText={{
            checkboxSelectionHeaderName: "勾選框",
            checkboxSelectionSelectAllRows: "選擇所有列'",
            checkboxSelectionUnselectAllRows: "取消選擇所有列",
            checkboxSelectionSelectRow: "選擇列",
            checkboxSelectionUnselectRow: "取消選擇列",
            columnsManagementSearchTitle: "搜尋",
            columnsManagementNoColumns: "沒有內容",
            columnsManagementShowHideAllText: "顯示/隱藏所有",
            columnsManagementReset: "重置",
            filterPanelAddFilter: "添加過濾",
            filterPanelRemoveAll: "全部移除",
            filterPanelDeleteIconLabel: "刪除",
            filterPanelLogicOperator: "邏輯操作符",
            filterPanelOperator: "操作符",
            filterPanelOperatorAnd: "包含",
            filterPanelOperatorOr: "或",
            filterPanelColumns: "欄位",
            filterPanelInputLabel: "條件值",
            filterPanelInputPlaceholder: "值",
            filterOperatorContains: "包含",
            filterOperatorEquals: "等於",
            filterOperatorStartsWith: "開始於",
            filterOperatorEndsWith: "結束於",
            filterOperatorIs: "是",
            filterOperatorNot: "不是",
            filterOperatorAfter: "晚於",
            filterOperatorOnOrAfter: "在或晚於",
            filterOperatorBefore: "早於",
            filterOperatorOnOrBefore: "在或早於",
            filterOperatorIsEmpty: "為空",
            filterOperatorIsNotEmpty: "不為空",
            filterOperatorIsAnyOf: "任意一個為",
            toolbarColumns: "顯示列",
            toolbarFilters: "過濾",
            toolbarDensity: "檢視",
            toolbarDensityCompact: "緊密",
            toolbarDensityStandard: "標準",
            toolbarDensityComfortable: "鬆散",
            toolbarExport: "匯出",
            toolbarExportCSV: "下載為CSV檔",
            toolbarExportPrint: "列印",
            toolbarQuickFilterPlaceholder: "搜尋…",
            footerRowSelected: (count) =>
              count !== 1
                ? `${count.toLocaleString()} 筆資料`
                : `${count.toLocaleString()} 筆資料`,
          }}
        />
      </ThemeProvider>
    </Paper>
  ) : (
    <div className="w-full mt-4 p-4 flex flex-col gap-4">
      <Skeleton
        variant="rectangular"
        className="w-2/3 ml-auto rounded-lg"
        height={20}
      />
      <Skeleton variant="rectangular" height={20} />
      <Skeleton variant="rectangular" height={20} />
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rounded" height={80} />
    </div>
  );
};

export default ArticleList;
