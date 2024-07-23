import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { CreateArticleData } from "@/types/Article";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";

interface PreviewDialogProps {
  open: boolean;
  onClose: () => void;
  article: CreateArticleData;
}

const EditorPreViewDialog: React.FC<PreviewDialogProps> = ({
  open,
  onClose,
  article,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>預覽文章</DialogTitle>
      <DialogContent>
        <div className="mb-20 mt-12 border-2 border-stone-800 px-24 py-16">
          <span className="text-sm font-bold text-stone-500">
            {format(new Date(), "yyyy-MM-dd   hh 時 MM 分")}
            <span className="text-base">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            {format(new Date(), "yyyy-MM-dd EEEE hh '時' mm '分 aaaa", {
              locale: zhTW,
            })}
            以前
          </span>
          <h1 className="my-8 text-4xl text-stone-600">{article.title}</h1>
          <p className="text-sm font-bold italic text-stone-900">
            {article.subTitle}
          </p>
          <div className="mt-4 max-h-[32.5rem] overflow-hidden">
            <Image
              src={article.coverImage}
              height={70}
              width={100}
              className="w-full grayscale-[10%]"
              alt="cover"
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
          <div className="my-4 border-b-[.0938rem] border-gray-300"></div>
          <div className="flex justify-between">
            <div className="flex gap-8">
              <span className="flex gap-1">
                <EyeIcon className="w-4" />0
              </span>
              {/* <span className="flex gap-1">
                <ChatBubbleBottomCenterIcon className="w-4" />
                {article.comments.length}
              </span> */}
            </div>
            <span
              className="group flex gap-1 transition-all hover:cursor-pointer focus:text-red-500"
              tabIndex={0}
            >
              <HeartIcon className="w-4 transition-all duration-300 group-focus:scale-[125%]" />
              0
            </span>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditorPreViewDialog;
