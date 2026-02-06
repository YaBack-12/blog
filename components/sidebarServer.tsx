import SideDash from "./sideDash";
import { getAuthUser } from "@/actions/AuthActions";
import { redirect } from "next/navigation";

export default async function SidebarServer() {
  const user = await getAuthUser();

  if (!user) redirect("/login");

  return <SideDash user={user} />;
}