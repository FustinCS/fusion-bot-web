import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const watching = await prisma.watches.findMany({
      where: {
        user_id: "251839702951264257",
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
    });

    console.log(watching);

    return NextResponse.json(watching, { status: 200 });
  } catch (error) {
    console.error("Error fetching watches:", error);
    return NextResponse.json({ error: "Failed to fetch watching data" }, { status: 500 });
  }
}