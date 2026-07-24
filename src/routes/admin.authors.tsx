import { createFileRoute } from "@tanstack/react-router";
import AdminAuthors from "@/admin/AdminAuthors";

export const Route = createFileRoute("/admin/authors")({
  component: AdminAuthors,
  head: () => ({
    meta: [
      { title: "Admin — Authors | HQ Stones" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
