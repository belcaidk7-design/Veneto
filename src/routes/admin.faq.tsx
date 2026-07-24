import { createFileRoute } from "@tanstack/react-router";
import AdminFaq from "@/admin/AdminFaq";

export const Route = createFileRoute("/admin/faq")({
  component: AdminFaq,
});
