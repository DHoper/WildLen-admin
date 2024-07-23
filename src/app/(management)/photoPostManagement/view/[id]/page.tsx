"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
  Avatar,
  Divider,
  Tab,
  Tabs,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import {
  KeyboardBackspace,
  Delete,
  LocationOn,
  Visibility,
  ThumbUp,
  Comment,
} from "@mui/icons-material";
import type { PhotoPost } from "@/types/PhotoPost";
import { getPhotoPostById, deletePhotoPost } from "@/api/management/photoPost";
import { format } from "date-fns";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Image from "next/image";

const PhotoPostViewPage = ({ params }: { params: { id: string } }) => {
  const [photoPost, setPhotoPost] = useState<PhotoPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<string>("details");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const id = params.id;

  useEffect(() => {
    if (id) {
      getPhotoPostById(Number(id))
        .then((response) => {
          setPhotoPost(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching photo post:", error);
          setError("Error fetching photo post");
          setLoading(false);
        });
    }
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleDelete = () => {
    deletePhotoPost(Number(id))
      .then(() => {
        setDeleteDialogOpen(false);
        // Redirect or update UI after deletion
      })
      .catch((error) => {
        console.error("Error deleting photo post:", error);
        setDeleteDialogOpen(false);
      });
  };

  return (
    <Box sx={{ minHeight: "100vh", px: 2, py: 4, bgcolor: "#f0f2f5" }}>
      <Link href="/photoPostManagement">
        <Button
          variant="contained"
          startIcon={<KeyboardBackspace />}
          sx={{ mb: 2 }}
        >
          返回
        </Button>
      </Link>
      <Card sx={{ mx: "auto", maxWidth: "1200px", p: 4, boxShadow: 3 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        ) : photoPost ? (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link href={`/userManagement/edit/${photoPost.authorId}`}>
                <div className="flex items-center gap-2">
                  <Avatar
                    className="size-12 border border-black"
                    alt={photoPost.author.username}
                    src={`/images/avatar (${photoPost.author.profile?.selectedAvatarIndex}).png`}
                  />
                  <div className="flex flex-col gap-2">
                    <Typography
                      className="font-semibold"
                      variant="body1"
                      color="textPrimary"
                    >
                      {photoPost.author.username}
                    </Typography>
                    <div className="text-right">
                      {photoPost.updatedAt ? (
                        <Typography variant="body2" color="textSecondary">
                          更新時間:{" "}
                          {format(
                            new Date(photoPost.updatedAt),
                            "yyyy/MM/dd HH:mm"
                          )}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          發佈時間:{" "}
                          {format(
                            new Date(photoPost.createdAt),
                            "yyyy/MM/dd HH:mm"
                          )}
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
              </Link>

              <IconButton
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Delete />
              </IconButton>
            </Box>

            <Divider sx={{ my: 2 }} />
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  className="w-full px-0"
                  onChange={handleTabChange}
                  aria-label="photo post tabs"
                  centered
                >
                  <Tab
                    className="w-1/2 shrink-0"
                    label="貼文內容"
                    value="details"
                  />
                  <Tab
                    disabled
                    className="w-1/2 shrink-0"
                    label="詳細資訊"
                    value="stats"
                  />
                </TabList>
              </Box>
              <TabPanel value="details">
                <Typography variant="h4" gutterBottom>
                  {photoPost.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {photoPost.description}
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {photoPost.images.map((image) => (
                    <Grid item xs={12} sm={6} md={4} key={image.id}>
                      <Box sx={{ overflow: "hidden", borderRadius: 2 }}>
                        <Image
                          src={image.url}
                          alt={image.publicId}
                          width={400}
                          height={300}
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              {/* <TabPanel value="stats">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Visibility color="action" />
                    <Typography variant="body2" color="textSecondary">
                      閱覽數: {photoPost.views}
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThumbUp color="action" />
                    <Typography variant="body2" color="textSecondary">
                      點讚數: {photoPost.likes}
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Comment color="action" />
                    <Typography variant="body2" color="textSecondary">
                      留言數: {photoPost.comments.length}
                    </Typography>
                  </div>
                  <Divider className="my-4" />
                </div>
              </TabPanel> */}
            </TabContext>
            <Divider sx={{ my: 2 }} />
            <div className="flex items-center justify-end gap-4 ">
              <div className="flex items-center space-x-2">
                <Visibility color="action" />
                <Typography variant="body2" color="textSecondary">
                  {photoPost.views}
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <ThumbUp color="action" />
                <Typography variant="body2" color="textSecondary">
                  {photoPost.likes}
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Comment color="action" />
                <Typography variant="body2" color="textSecondary">
                  {photoPost.comments.length}
                </Typography>
              </div>
            </div>
          </Box>
        ) : (
          <Typography className="mt-4 text-center">未找到照片詳情。</Typography>
        )}
      </Card>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>刪除帖子</DialogTitle>
        <DialogContent>
          <DialogContentText>
            確定要刪除這個帖子嗎？此操作無法撤銷。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button onClick={handleDelete} color="error">
            刪除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PhotoPostViewPage;
