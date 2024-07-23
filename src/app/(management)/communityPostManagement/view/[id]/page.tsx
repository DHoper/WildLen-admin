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
  Visibility,
  ThumbUp,
  Comment,
} from "@mui/icons-material";
import type { CommunityPost } from "@/types/CommunityPost";
import {
  getCommunityPostById,
  deleteCommunityPost,
} from "@/api/management/communityPost";
import { format } from "date-fns";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Image from "next/image";
import { getConvertedHtml } from "@/utils/convertor";

const CommunityPostViewPage = ({ params }: { params: { id: string } }) => {
  const [communityPost, setCommunityPost] = useState<CommunityPost | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<string>("details");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const id = params.id;
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getCommunityPostById(Number(id))
        .then((response) => {
          setCommunityPost(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("無法加載 community post:", error);
          setError("無法加載 community post");
          setLoading(false);
        });
    }
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleDelete = () => {
    deleteCommunityPost(Number(id))
      .then(() => {
        setDeleteDialogOpen(false);
        router.back();
      })
      .catch((error) => {
        console.error("Error deleting community post:", error);
        setDeleteDialogOpen(false);
      });
  };

  return (
    <Box sx={{ minHeight: "100vh", px: 2, py: 4, bgcolor: "#f0f2f5" }}>
      <Link href="/communityPostManagement">
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
        ) : communityPost ? (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link href={`/userManagement/edit/${communityPost.authorId}`}>
                <div className="flex items-center gap-2">
                  <Avatar
                    className="size-12 border border-black"
                    alt={communityPost.author.username}
                    src={`/images/avatar (${communityPost.author.profile?.selectedAvatarIndex}).png`}
                  />
                  <div className="flex flex-col gap-2">
                    <Typography
                      className="font-semibold"
                      variant="body1"
                      color="textPrimary"
                    >
                      {communityPost.author.username}
                    </Typography>
                    <div className="text-right">
                      {communityPost.updatedAt ? (
                        <Typography variant="body2" color="textSecondary">
                          更新時間:{" "}
                          {format(
                            new Date(communityPost.updatedAt),
                            "yyyy/MM/dd HH:mm"
                          )}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          發佈時間:{" "}
                          {format(
                            new Date(communityPost.createdAt),
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
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteDialogOpen(true);
                }}
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
                  aria-label="community post tabs"
                  centered
                >
                  <Tab
                    className="w-1/2 shrink-0"
                    label="貼文內容"
                    value="details"
                  />
                  <Tab
                    className="w-1/2 shrink-0"
                    label="詳細資訊"
                    value="stats"
                    disabled
                  />
                  <Tab
                    className="w-1/2 shrink-0"
                    label="留言"
                    value="comments"
                    disabled
                  />
                </TabList>
              </Box>
              <TabPanel value="details">
                <Typography variant="h4" gutterBottom>
                  {communityPost.title}
                </Typography>
                <div
                  className="px-2"
                  dangerouslySetInnerHTML={{
                    __html: getConvertedHtml(communityPost.content),
                  }}
                />
              </TabPanel>
              <TabPanel value="stats">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Visibility color="action" />
                    <Typography variant="body2" color="textSecondary">
                      閱覽數: {communityPost.views}
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThumbUp color="action" />
                    <Typography variant="body2" color="textSecondary">
                      點讚數: {communityPost.likes}
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Comment color="action" />
                    <Typography variant="body2" color="textSecondary">
                      留言數: {communityPost.comments.length}
                    </Typography>
                  </div>
                  <Divider className="my-4" />
                </div>
              </TabPanel>
              <TabPanel value="comments">
                <div className="space-y-4">
                  {communityPost.comments.map((comment) => (
                    <Box key={comment.id}>
                      <Typography variant="body2" color="textSecondary">
                        {comment.author.username} 說:
                      </Typography>
                      <Typography variant="body1">{comment.content}</Typography>
                      <Divider className="my-2" />
                    </Box>
                  ))}
                </div>
              </TabPanel>
            </TabContext>
            <Divider sx={{ my: 2 }} />
            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center space-x-2">
                <Visibility color="action" />
                <Typography variant="body2" color="textSecondary">
                  {communityPost.views}
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <ThumbUp color="action" />
                <Typography variant="body2" color="textSecondary">
                  {communityPost.likes}
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Comment color="action" />
                <Typography variant="body2" color="textSecondary">
                  {communityPost.comments.length}
                </Typography>
              </div>
            </div>
          </Box>
        ) : (
          <Typography className="mt-4 text-center">未找到貼文詳情。</Typography>
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

export default CommunityPostViewPage;
