import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const showData = body.showData;

    if (!showData) {
      return NextResponse.json(
        { error: "showData doesn't exist!" },
        { status: 400 }
      );
    }

    // fetch total episodes of the show
    const show = await prisma.show.findUnique({
      where: {
        show_id_season: {
          show_id: showData.show_id,
          season: showData.current_season + 1,
        },
      },
      select: {
        episodes: true, // This corresponds to the total_episodes
      },
    });

    // Now use the total_episodes from the Shows table
    await prisma.watches.update({
      where: {
        user_id_show_id_current_season: {
          user_id: showData.user_id,
          show_id: showData.show_id,
          current_season: showData.current_season,
        },
      },
      data: {
        current_season: showData.current_season + 1,
        current_episode: 0,
        date_updated: new Date().toISOString(),
      },
    });

    return NextResponse.json(show, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting the show" },
      { status: 500 }
    );
  }
}
