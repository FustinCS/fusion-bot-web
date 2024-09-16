"use client";

import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-around items-center p-8 min-h-8">
      <div className="">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Supposed to be Logo :&#40;
        </h4>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button className="rounded-full">Home</Button>
        </Link>
        <Link href="/list">
          <Button className="rounded-full">My List</Button>
        </Link>
        {session ? (
          <>
            <Button
              onClick={() => signOut()}
              className="bg-[#7289da] hover:bg-[#7289da] flex gap-2"
            >
              <DiscordLogoIcon />
              Sign Out
            </Button>

            <Image
              src={session.user?.image || ""}
              alt={session.user?.name || "Unknown User"}
              width={50}
              height={50}
              className="rounded-full object-center object-cover border-2 border-primary"
            />
          </>
        ) : (
          <Button
            onClick={() => signIn("discord")}
            className="bg-[#7289da] hover:bg-[#7289da] flex gap-2"
          >
            <DiscordLogoIcon />
            Sign in
          </Button>
        )}
        <ToggleTheme />
      </div>
    </nav>
  );
}
