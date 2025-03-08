import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Aurally",
};

export default function AdminPage() {
  redirect("/admin/login");
  return null;
}
