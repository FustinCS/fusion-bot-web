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
    
        // Perform the delete operation
        await prisma.watches.delete({
          where: {
             user_id_show_id_current_season: {
                user_id: showData.user_id,
                show_id: showData.show_id,
                current_season: showData.current_season,
             },
          },
        });
        
        return NextResponse.json({ message: 'Show deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error deleting the show" },
            { status: 500 }
        );
    }
}
