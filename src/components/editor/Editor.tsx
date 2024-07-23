"use client";
import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {
  Box,
  Button,
  TextField,
  Container,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Image from "next/image";
import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import EditorPreViewDialog from "./EditorPreViewDialog";
import { createArticle, updateArticle } from "@/api/management/article";
import { uploadImage } from "@/api/common/image";
import { Article, CreateArticleData } from "@/types/Article";
import { useRouter } from "next/navigation";
import { topicTags } from "@/fakeData/topicTags";

const allTags = Object.values(topicTags).reduce<string[]>((acc, category) => {
  return acc.concat(category.tags);
}, []);

interface EditorProps {
  mode: "create" | "edit";
  article?: Article;
}

const Editor: React.FC<EditorProps> = ({ mode, article }) => {
  const isMounted = useRef(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(
    null
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const coverImageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleTagChange = (event: React.ChangeEvent<{}>, value: string[]) => {
    setSelectedTags(value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewCoverImage(null);
    setCoverImage(null);
  };

  const handleSubmit = async () => {
    const delta = quillInstance?.getContents();

    if (title && selectedTags.length > 0 && previewCoverImage && delta) {
      try {
        let finalCoverImage = coverImage;
        let newImageIds: number[] = [];

        if (previewCoverImage !== coverImage) {
          const file = dataURLtoFile(previewCoverImage);
          if (!file) return;
          const uploadResponse = await uploadImage("article", file);
          finalCoverImage = uploadResponse[0].url;
          newImageIds.push(uploadResponse[0].id);
        }

        const deltaOps = delta.ops;
        for (const op of deltaOps) {
          if (op.insert && typeof op.insert === "object" && op.insert.image) {
            const imageBase64 = op.insert.image as string;
            const imageFile = dataURLtoFile(imageBase64);
            if (!imageFile) continue;

            const uploadResponse = await uploadImage("article", imageFile);
            op.insert = {
              image: uploadResponse[0].url,
            };
            newImageIds.push(uploadResponse[0].id);
          }
        }

        const updatedArticle: CreateArticleData = {
          ...article!,
          title,
          subTitle,
          content: delta,
          topicTags: selectedTags,
          coverImage: finalCoverImage!,
          imageIds: newImageIds,
        };

        console.log(updatedArticle);

        await createOrUpdateArticle(updatedArticle);

        router.push("/articleManagement");
      } catch (error) {
        console.error("無法創建/更新 article:", error);
      }
    }
  };

  const handlePreviewOpen = () => {
    const delta = quillInstance?.getContents();

    if (title && selectedTags.length > 0 && previewCoverImage && delta) {
      setIsPreviewOpen(true);
    }
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
  };

  const createOrUpdateArticle = async (article: CreateArticleData) => {
    try {
      if (mode === "create") {
        await createArticle(article);
      } else if (mode === "edit" && article.id) {
        await updateArticle(article.id, article);
      }
    } catch (error) {
      console.error("無法創建/更新 article:", error);
    }
  };

  useEffect(() => {
    if (editorRef.current && !isMounted.current) {
      const quill = new Quill(editorRef.current, {
        placeholder: "",
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });

      const toolbar = editorRef.current.previousSibling as HTMLElement | null;
      if (toolbar) {
        toolbar.style.borderTopLeftRadius = "4px";
        toolbar.style.borderTopRightRadius = "4px";
        toolbar.style.marginTop = "16px";
      }

      setQuillInstance(quill);
      isMounted.current = true;
    }

    return () => {
      if (quillInstance) {
        quillInstance.off("text-change");
        setQuillInstance(null);
      }
    };
  }, [quillInstance]);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setSubTitle(article.subTitle);
      setSelectedTags(article.topicTags);
      setCoverImage(article.coverImage);
      setPreviewCoverImage(article.coverImage);

      if (quillInstance) {
        if (mode === "edit") {
          quillInstance.setContents(article.content);
        }
      }
    }
  }, [article, mode, quillInstance]);

  return (
    <Container maxWidth="md">
      <Box>
        <TextField
          fullWidth
          variant="outlined"
          label="標題"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <Autocomplete
          multiple
          options={allTags}
          getOptionLabel={(option) => option}
          value={selectedTags}
          onChange={handleTagChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="選擇主題標籤"
              placeholder="標籤"
              margin="normal"
              fullWidth
            />
          )}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="副標題"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          margin="normal"
        />
        <Box my={2} position="relative">
          {previewCoverImage ? (
            <Box
              position="relative"
              className="flex items-center justify-center rounded-md border-2 border-dashed border-[#0000003b]"
            >
              <Image
                src={previewCoverImage}
                alt="封面"
                width={160}
                height={90}
                className="aspect-video w-full object-cover"
              />
              <div className="absolute right-4 top-4 flex gap-4">
                <IconButton
                  aria-label="更改圖片"
                  onClick={() => coverImageRef.current?.click()}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="移除圖片"
                  onClick={handleRemoveImage}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <Delete />
                </IconButton>
              </div>
            </Box>
          ) : (
            <Box
              onClick={() => coverImageRef.current?.click()}
              className="relative flex aspect-video w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-[#0000003b]"
            >
              <div className="flex flex-col items-center justify-center gap-2 text-[#0000003b]">
                <PhotoIcon className="size-12 text-[#0000003b]" />
                <span className="font-semibold">選擇封面圖片</span>
              </div>
            </Box>
          )}
          <input
            type="file"
            accept="image/*"
            ref={coverImageRef}
            hidden
            onChange={handleImageChange}
          />
        </Box>
        <div ref={editorRef} className="min-h-96 rounded-b" />
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="contained"
            className="bg-indigo-700 bg-gradient-to-r from-indigo-300/70"
            onClick={handleSubmit}
          >
            {mode === "create" ? "發佈文章" : "保存更改"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handlePreviewOpen}
          >
            預覽
          </Button>
        </Box>
      </Box>

      <EditorPreViewDialog
        open={isPreviewOpen}
        onClose={handlePreviewClose}
        article={{
          title,
          subTitle,
          topicTags: selectedTags,
          content: quillInstance?.root.innerHTML || "",
          coverImage: previewCoverImage!,
        }}
      />
    </Container>
  );
};

export default Editor;

function dataURLtoFile(dataUrl: string): File | null {
  const arr = dataUrl.split(",");

  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    return null;
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File([u8arr], "image.png", { type: mime });
  return file;
}
