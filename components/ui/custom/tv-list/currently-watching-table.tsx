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
import { useState } from "react";

interface CurrentlyWatchingTableProps {
  data: Watch[];
  setData: (newData: Watch[]) => void;
}

export default function CurrentWatchingTable({ data, setData }:  CurrentlyWatchingTableProps) {
  const [isLoading, setIsLoading] = useState(false);


  const handleIncrementEpisode = async (watchedShowInfo: Watch) => {
    try {
      setIsLoading(true);
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
    } catch (error) {
      console.error("Failed to increment episode count", error);
      alert("Failed to increment episode count (Internal Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrementEpisode = async (watchedShowInfo: Watch) => {
    try {
      setIsLoading(true);
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
    } catch (error) {
      console.error("Failed to decrement episode count", error);
      alert("Failed to decrement episode count (Internal Error)");
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrementSeason = async (watchedShowInfo: Watch) => {
    try {
      setIsLoading(true);
      if (watchedShowInfo.current_season === watchedShowInfo.total_seasons) {
        return;
      }

      // update db
      const response = await fetch(
        "/api/database/update-watched-tv/increment-season-tv",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ showData: watchedShowInfo }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update season count");
        alert("Failed to update season count (Internal Error)");
        return;
      }
      
      const result = await response.json();
      const totalEpisodes = result.episodes; // Adjust based on your response structure

      const newData = data.map((item) => {
        if (item.Show.show_id === watchedShowInfo.show_id) {
          return {
            ...item,
            Show: {
              ...item.Show,
              episodes: totalEpisodes,
            },
            current_episode: 0,
            current_season: item.current_season + 1,
          };
        }
        return item;
      });

      setData(newData);
    } catch (error) {
      console.error("Failed to increment season count", error);
      alert("Failed to increment season count (Internal Error)");
    } finally {
      setIsLoading(false);
    }
  
  }

  const handleDecrementSeason = async (watchedShowInfo: Watch) => {
    try {
      setIsLoading(true);
      if (watchedShowInfo.current_season === 1) {
        return;
      }

      // update db
      const response = await fetch(
        "/api/database/update-watched-tv/decrement-season-tv",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ showData: watchedShowInfo }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update season count");
        alert("Failed to update season count (Internal Error)");
        return;
      }
        

      const result = await response.json();
      const totalEpisodes = result.episodes; // Adjust based on your response structure

      const newData = data.map((item) => {
        if (item.Show.show_id === watchedShowInfo.show_id) {
          return {
            ...item,
            Show: {
              ...item.Show,
              episodes: totalEpisodes,
            },
            current_episode: 0,
            current_season: item.current_season - 1,
          };
        }
        return item;
      });

      setData(newData);
    } catch (error) {
      console.error("Failed to decrement season count", error);
      alert("Failed to decrement season count (Internal Error)");
    } finally {
      setIsLoading(false);
    }

  }

  const handleDelete = async (watchedShowInfo: Watch) => {
    try {
      setIsLoading(true);
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
    } catch (error) {
      console.error("Failed to delete show", error);
      alert("Failed to delete show. (Internal Error)");
    } finally {
      setIsLoading(false);
    }
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
                    <Button onClick={() => handleDelete(item)} disabled={isLoading} variant="ghost" className="disabled:cursor-not-allowed disabled:opacity-100">
                      Delete
                      </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center text-lg">
                  <div className="flex justify-center items-center gap-2 group relative">
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleDecrementSeason(item)}
                        disabled={isLoading}
                        className="hidden group-hover:flex"
                      >
                        -
                      </Button>
                      {item.current_season}
                      <Button
                        variant="ghost"
                        onClick={() => handleIncrementSeason(item)}
                        disabled={isLoading}
                        className="hidden group-hover:flex"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center text-lg">
                  <div className="flex justify-center items-center gap-2 group relative">
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleDecrementEpisode(item)}
                        disabled={isLoading}
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
                        onClick={() => handleIncrementEpisode(item)}
                        disabled={isLoading}
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
