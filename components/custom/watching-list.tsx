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

interface WatchingListProps {
  watchedShows: WatchedTVShow[];
}

export default function WatchingList({ watchedShows } : WatchingListProps) {
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
          {watchedShows.map((show, index) => {
            return (
              <TableRow key={index}>
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
                  </div>
                </TableCell>
                <TableCell className="text-center text-lg">{show.current_season}</TableCell>
                <TableCell className="text-center text-lg">
                  {show.current_episode}
                  {show.Show.episode_count != 0 ? `/${show.Show.episode_count}` : ""}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
