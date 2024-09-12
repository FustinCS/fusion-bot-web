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
import useSWR from "swr";
import { User } from "next-auth";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  
export default function CurrentWatchingTable({ userInfo }: { userInfo: User }) {
  const { data, error } = useSWR<Watch[]>(
    `/api/database/get-watched-tv?user_id=${userInfo.id}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (!data) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  return (
    <>
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mt-8 p-8">
        Current Watching
      </h2>
      <Card className="border-secondary border-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-6 text-lg">Title</TableHead>
              <TableHead className="w-[200px] text-lg text-center">
                Progress
              </TableHead>
              <TableHead className="w-[200px] text-lg text-center">
                Type
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex gap-6 m-4 items-center">
                      <div className="w-[48px] lg:w-[48px]">
                        <AspectRatio ratio={1}>
                          <Image
                            src={item.Show.image}
                            alt={item.Show.name || "Unknown"}
                            className="rounded-md object-center object-cover"
                            fill
                          />
                        </AspectRatio>
                      </div>
                      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        {item.Show.name}
                      </h4>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-lg">
                    {item.current_episode}/{item.Show.episodes}
                  </TableCell>
                  <TableCell className="text-center text-lg">TV</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
