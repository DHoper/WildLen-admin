import Editor from "@/components/editor/Editor";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function ArticleCreatePage() {
  return (
    <div className="w-full min-h-screen pt-4 pb-8 px-8 text-black">
      <Link href={"/articleManagement"}>
        <ArrowLongLeftIcon className="h-8 w-8 mb-4" />
      </Link>
      <Card className="w-[90%] mx-auto p-8 bg-transparent">
        <Typography
          className="w-fit mx-auto text-2xl font-semibold"
          gutterBottom
        >
          新增文章
        </Typography>
        <Editor mode="create" />
      </Card>
    </div>
  );
}
