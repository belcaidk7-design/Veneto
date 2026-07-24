import { createFileRoute } from "@tanstack/react-router";
import AdminLogin from "@/admin/AdminLogin";

export const Route = createFileRoute("/admin_/login")({
  component: AdminLogin,
  head: () => ({
    meta: [
      { title: "Admin login | HQ Stones" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
