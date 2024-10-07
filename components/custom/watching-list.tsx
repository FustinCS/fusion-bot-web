"use client";

import { Card } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { WatchedTVShow } from "@/lib/types/types";
import { Button } from "../ui/button";

interface WatchingListProps {
  watchedShows: WatchedTVShow[];
  setWatchedShows: React.Dispatch<React.SetStateAction<WatchedTVShow[]>>;
}

export default function WatchingList({ watchedShows, setWatchedShows } : WatchingListProps) {

  async function handleDeleteShow(showId: number) {
    // update state
    setWatchedShows((prev) => prev.filter((show) => show.showId !== showId));

    // update db
    await fetch("/api/tvshows", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        showId: showId,
      }),
    });
  }

  return (
    <Card className="w-full bg-card border-secondary">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-6 text-lg">Title</TableHead>
            <TableHead className="w-[200px] text-lg text-center">
              Season
            </TableHead>
            <TableHead className="w-[200px] text-lg text-center">
              Progress
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchedShows.map((show) => {
            return (
              <TableRow key={show.updatedAt.toString()}>
                <TableCell className="font-medium">
                  <div className="flex gap-6 m-4 items-center">
                    <div className="w-[48px] lg:w-[48px]">
                      <AspectRatio ratio={1}>
                        <Image
                          src={show.Show.image || ""}
                          alt={show.Show.name || "Unknown"}
                          className="rounded-md object-center object-cover"
                          width={50}
                          height={50}
                        />
                      </AspectRatio>
                    </div>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      {show.Show.name || "Unknown"}
                    </h4>
                    <Button onClick={() => handleDeleteShow(show.showId)}>Delete</Button>
                  </div>
                </TableCell>
                <TableCell className="text-center text-lg">{show.currentSeason}</TableCell>
                <TableCell className="text-center text-lg">
                  {show.currentEpisode}
                  {show.Show.episodeCount != 0 ? `/${show.Show.episodeCount}` : ""}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
