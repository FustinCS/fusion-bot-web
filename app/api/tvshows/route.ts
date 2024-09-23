import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// no need for verification because already done on middleware.ts
const GET = async () => {
    const session = await getServerSession(authOptions);
    
    // website user
    if (session) {
        // fetch provider_id
        const account = await prisma.account.findFirst({
            where: {
                userId: session.user.id, // Filter by user ID
            },
            select: {
                providerAccountId: true, // Select only the provider account ID
                provider: true, // Optionally, select the provider name
            },
        });

        if (!account) {
            return NextResponse.json({ message: "No account found" }, { status: 404 });
        }

        // fetch watched shows from the database
        const watchedShows = await prisma.watches.findMany({
            where: {
                provider_id: account.providerAccountId,
            },
            select: {
                show_id: true,
                current_season: true,
                current_episode: true,
                Show: {
                    select: {
                        name: true,
                        season: true,
                        episode_count: true,
                        image: true,
                    },
                },
            },
        });

        return NextResponse.json({watchedShows: watchedShows}, {status: 200});

    }

    return NextResponse.json({ message: "Error" }, { status: 404 });

    // TODO: implement external access (through a client or a bot (e.g., Discord bot))

    // external access (through a client or a bot (e.g., Discord bot))
    // else {
    //     // fetch Oauth2 provider id
    //     const providerId = req.nextUrl.searchParams.get("discordId");
    // }
}



export { GET };