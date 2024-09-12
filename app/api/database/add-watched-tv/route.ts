import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import fetchShowData from "@/utils/fetch-show-data";
import { Watch } from "@/utils/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.showName) {
      return NextResponse.json(
        { error: "Show name is required" },
        { status: 400 }
      );
    }
    const showName = body.showName;

    // Fetch from the external API (TVMaze)
    const showData = await fetchShowData(showName);

    // Add the show to the database
    await prisma.$transaction(async (tx) => {
      // Upsert the user (insert if doesn't exist)
      await tx.user.upsert({
        where: { user_id: body.userId },
        update: {}, // Do nothing if user exists
        create: { user_id: body.userId },
      });

      // Upsert the show and seasons
      for (const season of showData.seasons) {
        await tx.show.upsert({
          where: {
            show_id_season: {
              show_id: showData.show_id,
              season: season.season,
            },
          },
          update: {}, // Do nothing if show and season exist
          create: {
            show_id: showData.show_id,
            name: showData.name,
            season: season.season,
            episodes: season.episodeCount,
            image: showData.image,
          },
        });
      }

      // Insert into the Watches table
      await tx.watches.create({
        data: {
          user_id: body.userId, // Use the correct field name
          show_id: showData.show_id, // Use the correct field name
          current_season: 1, // Set default season
          current_episode: 0, // Set default episode
        },
      });
    });

    // build out the response to send back to the client
    const result = {
        Show: {
            show_id: showData.show_id,
            name: showData.name,
            season: showData.seasons[0].season,
            episodes: showData.seasons[0].episodeCount,
            image: showData.image,
        },
        user_id: body.userId,
        show_id: showData.show_id,
        current_episode: 0,
        date_updated: new Date().toISOString(),
        current_season: 1,
    };


    return NextResponse.json({ 
        message: "Show added successfully", 
        showData: result
      });
  } catch (err) {
    console.error("Error in POST request:", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
