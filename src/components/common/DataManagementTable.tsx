import React from "react";
import {
  DataGrid,
  GridColDef,
  GridSlots,
  GridSortDirection,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  Paper,
  IconButton,
  ThemeProvider,
  LinearProgress,
  Skeleton,
  createTheme,
  useTheme,
} from "@mui/material";
import { zhTW } from "@mui/material/locale";

interface DataManagementTableProps<T> {
  initialColumns: GridColDef[];
  data: T[];
  loading: boolean;
  error: string | null;
  sortField: string;
  sortOrder: GridSortDirection;
}

const DataManagementTable = <T extends { id: number; createdAt: string }>({
  initialColumns,
  data,
  loading,
  error,
  sortField,
  sortOrder,
}: DataManagementTableProps<T>) => {
  const existingTheme = useTheme();
  const theme = createTheme({}, zhTW, existingTheme, {
    direction: "rtl",
  });

  const applySort = (data: T[]) => {
    return data.sort((a, b) => {
      switch (sortField) {
        case "title":
          return sortOrder === "asc"
            ? (a as any).title.localeCompare((b as any).title)
            : (b as any).title.localeCompare((a as any).title);
        case "views":
          return sortOrder === "asc"
            ? (a as any).views - (b as any).views
            : (b as any).views - (a as any).views;
        case "likes":
          return sortOrder === "asc"
            ? (a as any).likes - (b as any).likes
            : (b as any).likes - (a as any).likes;
        default:
          return 0;
      }
    });
  };

  const sortedData = applySort([...data]);

  return sortedData && sortedData.length > 0 ? (
    <Paper className="scrollbar-hide w-full flex-1 overflow-auto bg-transparent p-4">
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
          rows={sortedData}
          columns={initialColumns}
          initialState={{
            columns: {
              columnVisibilityModel: {
                topicTags: false,
              },
            },
          }}
          checkboxSelection={true}
          sortingMode="server"
          slots={{
            toolbar: GridToolbar,
            loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          pagination
          loading={loading}
          localeText={localText}
        />
      </ThemeProvider>
    </Paper>
  ) : (
    <div className="mt-4 flex w-full flex-col gap-4 p-4">
      {error && <div className="text-red-500">{error}</div>}
      <Skeleton
        variant="rectangular"
        className="ml-auto w-2/3 rounded-lg"
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

export default DataManagementTable;

export const localText = {
  checkboxSelectionHeaderName: "勾選框",
  checkboxSelectionSelectAllRows: "選擇所有列'",
  checkboxSelectionUnselectAllRows: "取消選擇所有列",
  checkboxSelectionSelectRow: "選擇列",
  checkboxSelectionUnselectRow: "取消選擇列",
  columnsManagementSearchTitle: "搜尋",
  columnsManagementNoColumns: "沒有內容",
  columnsManagementShowHideAllText: "顯示/隱藏所有",
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
  footerRowSelected: (count: number) =>
    count !== 1
      ? `${count.toLocaleString()} 筆資料`
      : `${count.toLocaleString()} 筆資料`,
};
