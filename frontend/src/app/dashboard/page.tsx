import React from "react";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="grid min-h-[calc(100vh-4rem)] auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
    </>
  );
}
