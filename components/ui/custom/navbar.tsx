'use client';

import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { Button } from "../button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="flex justify-center h-16 my-4">
            <div className="flex items-center gap-64 bg-card p-8 rounded-full border-4 border-accent mx-16">
                <div>
                    <h1>Fusion</h1>
                </div>
                <div>
                    <Button variant="ghost">My List</Button>
                </div>
                <div className="flex items-center gap-4">
                    <ToggleTheme />
                    {!session ? (
                        <Button className="bg-[#5865F2] text-white hover:bg-[#6873f1]" onClick={() => signIn("discord")}>
                            Login with Discord
                        </Button>
                    ) : (
                        <Button className="bg-red-500 text-white hover:bg-red-600" onClick={() => signOut()}>
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    )
}