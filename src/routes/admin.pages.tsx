import { createFileRoute } from "@tanstack/react-router";
import AdminPages from "@/admin/AdminPages";

export const Route = createFileRoute("/admin/pages")({
  component: AdminPages,
});
