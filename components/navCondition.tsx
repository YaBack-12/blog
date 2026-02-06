import { headers } from "next/headers";
import NavBar from "./navBar";

export default async function NavBarWrapper() {
  const headerObj = await headers();
  const pathname = headerObj.get("x-pathname");

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  

  return <NavBar />;
}
