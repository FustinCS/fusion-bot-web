'use client'
import Navbar from "@/components/ui/custom/navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <></>;
  };


  return (
    <main>
      <Navbar />
    </main>
  );
}
