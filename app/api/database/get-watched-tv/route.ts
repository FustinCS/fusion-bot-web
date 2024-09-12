import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  try {
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
    });
    return NextResponse.json(watching, { status: 200 });
  } catch (error) {
    console.error("Error fetching watches:", error);
    return NextResponse.json(
      { error: "Failed to fetch watching data" },
      { status: 500 }
    );
  }
}
