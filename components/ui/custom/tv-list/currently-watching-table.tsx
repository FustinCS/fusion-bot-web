"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card } from "@/components/ui/card";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Watch } from "@/utils/types";
import { Button } from "../../button";

export default function CurrentWatchingTable({
  data,
  setData,
}: {
  data: Watch[];
  setData: (newData: Watch[]) => void;
}) {
  const handleIncrement = async (watchedShowInfo: Watch) => {
    // if the show doesn't have a total ep count
    if (
      watchedShowInfo.Show.episodes !== null &&
      watchedShowInfo.current_episode === watchedShowInfo.Show.episodes
    ) {
      return;
    }

    // database update
    const response = await fetch(
      "/api/database/update-watched-tv/increment-episode-tv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showData: watchedShowInfo }),
      }
    );

    if (!response.ok) {
      console.error("Failed to update episode count");
      alert("Failed to update episode count (Internal Error)");
      return;
    }

    const newData = data.map((item) => {
      if (item.Show.show_id === watchedShowInfo.show_id) {
        return {
          ...item,
          current_episode: item.current_episode + 1,
        };
      }
      return item;
    });

    setData(newData);
  };

  const handleDecrement = async (watchedShowInfo: Watch) => {
    // if the show doesn't have a total ep count
    if (watchedShowInfo.current_episode === 0) {
      return;
    }

    // database update
    const response = await fetch(
      "/api/database/update-watched-tv/decrement-episode-tv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showData: watchedShowInfo }),
      }
    );

    if (!response.ok) {
      console.error("Failed to update episode count");
      alert("Failed to update episode count (Internal Error)");
      return;
    }

    // update data state for real time updates instead of needing to refresh the page
    const newData = data.map((item) => {
      if (item.Show.show_id === watchedShowInfo.show_id) {
        return {
          ...item,
          current_episode: item.current_episode - 1,
        };
      }
      return item;
    });

    setData(newData);
  };

  const handleDelete = async (watchedShowInfo: Watch) => {
    // database update
    const response = await fetch(
      "/api/database/remove-watched-tv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showData: watchedShowInfo }),
      }
    );

    if (!response.ok) {
      console.error("Failed to delete show");
      alert("Failed to delete show. (Internal Error)");
      return;
    }

    setData(data.filter((item) => item.Show.show_id !== watchedShowInfo.show_id));
  }

  return (
    <>
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mt-8 p-8">
        Current Watching
      </h2>
      <Card className="border-secondary border-2 mb-16">
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
            {data.map((item) => (
              <TableRow key={item.date_updated?.toString()}>
                <TableCell className="font-medium">
                  <div className="flex gap-6 m-4 items-center">
                    <div className="w-[48px] lg:w-[48px]">
                      <AspectRatio ratio={1}>
                        <Image
                          src={item.Show.image}
                          alt={item.Show.name || "Unknown"}
                          className="rounded-md object-center object-cover"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </AspectRatio>
                    </div>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      {item.Show.name}
                    </h4>
                    <Button onClick={() => handleDelete(item)} variant="ghost">
                      Delete
                      </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center text-lg">
                  {item.current_season}
                </TableCell>
                <TableCell className="text-center text-lg">
                  <div className="flex justify-center items-center gap-2 group relative">
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleDecrement(item)}
                        className="hidden group-hover:flex"
                      >
                        -
                      </Button>
                      {item.Show.episodes ? (
                        <>
                          {item.current_episode}/{item.Show.episodes}
                        </>
                      ) : (
                        item.current_episode
                      )}
                      <Button
                        variant="ghost"
                        onClick={() => handleIncrement(item)}
                        className="hidden group-hover:flex"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
