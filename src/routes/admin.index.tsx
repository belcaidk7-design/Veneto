import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "@/admin/AdminDashboard";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: "Admin Dashboard | HQ Stones" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
