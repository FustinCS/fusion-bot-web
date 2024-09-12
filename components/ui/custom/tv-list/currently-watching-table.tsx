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

export default function CurrentWatchingTable({ data, setData }: { data: Watch[], setData: (newData: Watch[]) => void }) {
  const handleIncrement = (showId: number) => {
    const newData = data.map((item) => {
      if (item.Show.show_id === showId) {
        return {
          ...item,
          current_episode: item.current_episode + 1,
        };
      }
      return item;
    });
    setData(newData);
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
                        onClick={() => handleIncrement(item.Show.show_id)}
                        className="hidden group-hover:flex"
                      >
                        +
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
                        onClick={() => handleIncrement(item.Show.show_id)}
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
