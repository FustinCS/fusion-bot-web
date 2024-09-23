import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fetchShowData from "@/utils/fetchShowData";
import { getProviderId } from "@/utils/fetchProviderId";

// no need for verification because already done on middleware.ts
const GET = async () => {
  // fetch provider Id
  const providerId = await getProviderId();

  if (!providerId) {
    return NextResponse.json({ message: "No account found" }, { status: 404 });
  }

  // fetch watched shows from the database
  const watchedShows = await prisma.watches.findMany({
    where: {
      provider_id: providerId,
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

  return NextResponse.json({ watchedShows: watchedShows }, { status: 200 });
};

const POST = async (req: NextRequest) => {
  // fetch provider Id
  try {
    const providerId = await getProviderId();

    if (!providerId) {
      return NextResponse.json(
        { message: "No account found" },
        { status: 404 }
      );
    }

    const response = await req.json();
    const showName = response.showName;
    const showData = await fetchShowData(showName);

    // create a transaction to insert data into tables
    await prisma.$transaction(async (tx) => {
      // add all seasons of show to db
      for (const season of showData.seasons) {
        await tx.show.upsert({
          where: {
            show_id_season: {
              show_id: showData.show_id,
              season: season.season,
            },
          },
          create: {
            show_id: showData.show_id,
            season: season.season,
            name: showData.name,
            image: showData.image,
            episode_count: season.episodeCount,
          },
          update: {
            name: showData.name,
            image: showData.image,
            episode_count: season.episodeCount,
          },
        });
      }

      // now we add the show to the watched shows table
      await tx.watches.create({
        data: {
          provider_id: providerId,
          show_id: showData.show_id,
          current_season: 1,
          current_episode: 0,
        },
      });
    });

    return NextResponse.json(
      { message: "Show added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error adding show" }, { status: 500 });
  }
};

export { GET, POST };
