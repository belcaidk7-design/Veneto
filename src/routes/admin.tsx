import { createFileRoute } from "@tanstack/react-router";
import AdminLayout from "@/admin/AdminLayout";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({
    meta: [
      { title: "SEO Admin | HQ Stones" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
