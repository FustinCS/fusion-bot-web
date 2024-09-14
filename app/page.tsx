"use client";

import Navbar from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();
  if (status === "loading") {
    return <main className="bg-background h-screen"></main>
  }

  return (
    <main className="bg-background h-screen">
      <Navbar />
      <div className="flex-col m-16">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          Hi this is my discord bot home page :D
        </h1>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight m-8 text-center">
          Nothing to see here k thx bye
        </h3>
      </div>
    </main>
  );
}
