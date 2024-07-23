"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Grid,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  CardContent,
  Avatar,
  Autocomplete,
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import AccountOutline from "mdi-material-ui/AccountOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";
import InformationOutline from "mdi-material-ui/InformationOutline";
import { KeyboardBackspace as KeyboardBackspaceIcon } from "@mui/icons-material";
import {
  getUserById,
  updateUser,
  deleteUser,
  updatePassword,
} from "@/api/management/user";
import type { User, UpdateUserData } from "@/types/User";
import { useRouter } from "next/navigation";
import { topicTags } from "@/fakeData/topicTags";

const avatarOptions = Array.from({ length: 12 }, (_, index) => index + 1);
const allTags = Object.values(topicTags).reduce<string[]>((acc, category) => {
  return acc.concat(category.tags);
}, []);

const EditUserPage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number>(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [intro, setIntro] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<string>("account");
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState<boolean>(false);

  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const user = await getUserById(Number(id));

          setUser(user);
          setSelectedAvatarIndex(user.profile?.selectedAvatarIndex || 1);
          setSelectedTags(user.profile?.selectedTags || []);
          setIntro(user.profile?.intro || "");
          setLoading(false);
        } catch (error) {
          console.error("獲取用戶資訊時發生錯誤:", error);
          setError("獲取用戶資訊時發生錯誤");
          setLoading(false);
        }
      })();
    }
  }, [id]);

  const handleSave = async () => {
    if (user) {
      setSaving(true);
      const updateData: UpdateUserData = {
        email: user.email,
        username: user.username,
        profile: {
          selectedAvatarIndex,
          selectedTags,
          intro,
        },
      };

      try {
        await updateUser(Number(id), updateData);
        setSaving(false);
        alert("用戶資料成功更新!");
      } catch (error) {
        console.error("用戶資料更新失敗:", error);
        setError("用戶資料更新失敗");
        setSaving(false);
      }
    }
  };

  const handleConfirmChangePassword = () => {
    if (!newPassword.trim()) return;
    setOpenChangePasswordDialog(true);
  };

  const handleCancelChangePassword = () => {
    setOpenChangePasswordDialog(false);
  };

  const handleChangePassword = async () => {
    try {
      await updatePassword(Number(id), newPassword);
      setOpenChangePasswordDialog(false);
      alert("密碼更改成功！");
    } catch (error) {
      console.error("密碼更改失敗:", error);
      setError("密碼更改失敗");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(Number(id));
      alert("用戶已成功刪除!");
      router.push("/userManagement");
    } catch (error) {
      console.error("刪除用戶失敗:", error);
      setError("刪除用戶失敗");
    }
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const renderLoading = () => (
    <div className="flex min-h-screen w-full items-center justify-center">
      <CircularProgress />
    </div>
  );

  const renderError = () => (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    </div>
  );

  const renderAvatarOptions = () =>
    avatarOptions.map((option) => (
      <MenuItem key={option} value={option}>
        {`頭像 ${option}`}
      </MenuItem>
    ));

  const renderTabs = () => (
    <TabContext value={tabValue}>
      <TabList
        className="px-0"
        onChange={handleTabChange}
        aria-label="user edit tabs"
        centered
      >
        <Tab
          value="account"
          className="w-1/2"
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountOutline />
              <Typography>帳戶資訊</Typography>
            </Box>
          }
        />
        <Tab
          value="security"
          className="w-1/2"
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LockOpenOutline />
              <Typography>安全性</Typography>
            </Box>
          }
        />
      </TabList>
      <TabPanel value="account">{renderAccountInfoTab()}</TabPanel>
      <TabPanel value="security">{renderSecurityTab()}</TabPanel>
    </TabContext>
  );

  const renderAccountInfoTab = () =>
    user && (
      <CardContent>
        <Grid container spacing={4} className="mt-2">
          <Grid
            item
            xs={12}
            className="mb-4 flex flex-col items-center justify-center gap-4"
          >
            <Avatar
              alt="User avatar"
              src={`/images/avatar (${selectedAvatarIndex}).png`}
              sx={{ width: 96, height: 96, border: "2px solid black", mr: 2 }}
            />
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>頭像</InputLabel>
              <Select
                label="頭像"
                value={selectedAvatarIndex}
                className="text-center"
                onChange={(e) => setSelectedAvatarIndex(Number(e.target.value))}
              >
                {renderAvatarOptions()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="用戶名"
              variant="outlined"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="信箱"
              variant="outlined"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <Autocomplete
                multiple
                options={allTags}
                getOptionLabel={(option) => option}
                value={selectedTags}
                onChange={(_, value) => setSelectedTags(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="感興趣的主題"
                    placeholder="主題標籤"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="自我簡介"
              variant="outlined"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving}
              fullWidth
            >
              {saving ? <CircularProgress size={24} /> : "保存"}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    );

  const renderSecurityTab = () => (
    <CardContent className="mt-4">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <TextField
              className="flex-1"
              label="新密碼"
              variant="outlined"
              type="password"
              size="small"
              fullWidth
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleConfirmChangePassword}
              className="mt-2 md:mt-0"
            >
              更改密碼
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} className="mt-4 flex justify-center">
          <Button
            variant="outlined"
            color="error"
            onClick={handleConfirmDelete}
          >
            刪除帳戶
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  );

  const renderChangePasswordDialog = () => (
    <Dialog
      open={openChangePasswordDialog}
      onClose={handleCancelChangePassword}
    >
      <DialogTitle>確認更改密碼</DialogTitle>
      <DialogContent>
        <DialogContentText>你確定要更改這個帳戶的密碼嗎？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelChangePassword}>取消</Button>
        <Button onClick={handleChangePassword} color="primary">
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderDeleteUserDialog = () => (
    <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
      <DialogTitle>確認刪除帳戶</DialogTitle>
      <DialogContent>
        <DialogContentText>
          你確定要刪除這個帳戶嗎？此操作不可恢復。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete}>取消</Button>
        <Button onClick={handleDelete} color="error">
          刪除
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className="min-h-screen w-full px-4 py-8 text-black">
      <Button
        variant="contained"
        startIcon={<KeyboardBackspaceIcon fontSize="medium" />}
        onClick={() => router.back()}
        sx={{ marginBottom: 2 }}
      >
        返回
      </Button>
      <Card className="mx-auto w-full max-w-4xl p-6">
        <Typography className="mb-4 text-center text-2xl font-semibold">
          更改用戶資料
        </Typography>
        {loading && renderLoading()}
        {error && renderError()}
        {user && renderTabs()}
      </Card>
      {renderChangePasswordDialog()}
      {renderDeleteUserDialog()}
    </div>
  );
};

export default EditUserPage;
