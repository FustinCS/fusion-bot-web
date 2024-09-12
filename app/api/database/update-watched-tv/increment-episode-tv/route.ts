import { NextResponse } from 'next/server';
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

      const updatedWatch = await prisma.watches.update({
        where: {
          user_id_show_id_current_season: {
            user_id: showData.user_id,
            show_id: showData.show_id,
            current_season: showData.current_season,
          },
        },
        data: {
          current_episode: showData.current_episode + 1,
          date_updated: new Date().toISOString(), // Automatically update the last updated timestamp
        },
      });
      
      return NextResponse.json(updatedWatch, { status: 200 });
        
    }
    catch (error) {
        return NextResponse.json(
            { error: "Internal Error" },
            { status: 500 }
          );
    }
}