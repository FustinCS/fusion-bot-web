"use client";

import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { Button } from "../button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="my-4">
      <div className="flex justify-center">
        <div className="flex justify-between items-center bg-card py-2 px-8 rounded-full border-4 border-accent mx-auto max-w-[1000px] w-full">
          <div className="w-[130px]">
            <div className="flex">
              <Link href="/">
                <h1>Fusion</h1>
              </Link>
            </div>
          </div>
          <div>
            <Link href="/list">
              <Button variant="ghost">My List</Button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {!session ? (
              <Button
                className="bg-[#5865F2] text-white hover:bg-[#6873f1]"
                onClick={() => signIn("discord")}
              >
                Login with Discord
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => signOut()}>
                Logout
              </Button>
            )}
            <ToggleTheme />
          </div>
        </div>
      </div>
    </nav>
  );
}
