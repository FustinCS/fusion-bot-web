import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  try {
    // Fetch the user's watches with show details
    const watching = await prisma.watches.findMany({
      where: {
        user_id: user_id,
      },
      include: {
        Show: {
          select: {
            show_id: true,
            name: true,
            season: true,
            episodes: true,
            image: true,
          },
        },
      },
      orderBy: {
        date_updated: "desc",
      },
    });

    // Collect the distinct show_ids to query the season counts
    const showIds = watching.map((watch) => watch.Show.show_id);

    // Fetch the total season count for each show
    const seasonCounts = await prisma.show.groupBy({
      by: ["show_id"],
      _count: {
        season: true, // Count distinct seasons for each show
      },
      where: {
        show_id: {
          in: showIds, // Only for the shows the user is watching
        },
      },
    });

    // Map the results to include `totalSeasons` based on the grouped season count
    const watchingWithSeasons = watching.map((watch) => {
      const seasonCount = seasonCounts.find((count) => count.show_id === watch.Show.show_id)

      return {
        ...watch,
        total_seasons: seasonCount?._count.season,
      };
    });

    return NextResponse.json(watchingWithSeasons, { status: 200 });
  } catch (error) {
    console.error("Error fetching watches:", error);
    return NextResponse.json(
      { error: "Failed to fetch watching data" },
      { status: 500 }
    );
  }
}
