import { KeyboardBackspace } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";

export default function ArticleCreatePage() {
  const Editor = useMemo(() => {
    return dynamic(() => import("@/components/editor/Editor"), {
      loading: () => (
        <div className="my-4 flex w-full items-center justify-center">
          <CircularProgress />
        </div>
      ),

      ssr: false,
    });
  }, []);

  return (
    <div className="min-h-screen w-full px-8 pb-8 pt-4 text-black">
      <Link href={"/articleManagement"}>
        <Button
          variant="contained"
          startIcon={<KeyboardBackspace fontSize="medium" />}
          sx={{ marginBottom: 2 }}
        >
          返回
        </Button>
      </Link>
      <Card className="mx-auto w-full max-w-4xl bg-white p-8">
        <Typography
          className="mx-auto w-fit text-2xl font-semibold"
          gutterBottom
        >
          新增文章
        </Typography>
        <Editor mode="create" />
      </Card>
    </div>
  );
}
