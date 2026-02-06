"use client";
import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  // Hide Footer on /dashboard and all subroutes
  if (pathname && pathname.startsWith("/dashboard")) {
    return null;
  }
  return <Footer />;
}