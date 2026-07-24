import { createFileRoute } from "@tanstack/react-router";
import AdminBlog from "@/admin/AdminBlog";

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlog,
  head: () => ({
    meta: [
      { title: "Admin — Blog | HQ Stones" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
