import React from "react";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const firstName = session.user?.name?.split(" ")[0] ?? "there";

  return <DashboardContent userName={firstName} />;
}
