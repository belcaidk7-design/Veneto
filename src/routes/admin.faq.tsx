import { createFileRoute } from "@tanstack/react-router";
import AdminFaq from "@/admin/AdminFaq";

export const Route = createFileRoute("/admin/faq")({
  component: AdminFaq,
  head: () => ({
    meta: [
      { title: "Admin — FAQ | HQ Stones" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
