"use client";
import Navbar from "@/components/custom/navbar";
import ProfileInformation from "@/components/custom/profile-information";
import { useSession } from "next-auth/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WatchingList from "@/components/custom/watching-list";
import { useEffect, useState } from "react";
import { WatchedTVShow } from "@/lib/types/types";
import { Button } from "@/components/ui/button";

export default function ListPage() {
  const { data: session, status } = useSession();
  const [watchedShows, setWatchedShows] = useState<WatchedTVShow[]>([]);

  useEffect(() => {
    async function fetchWatchedShows() {
      const response = await fetch("/api/tvshows", {method: "GET"});
      const data = await response.json();
      setWatchedShows(data.watchedShows);
    }

    fetchWatchedShows();
  }, []);


  async function addShow() {
    await fetch("/api/tvshows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        showName: "Monster High",
      }),
    });
  }

  
  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Access Denied</div>;

  return (
    <main className="bg-background h-screen">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-8/12">
          <ProfileInformation session={session}></ProfileInformation>
          <Button onClick={addShow}>Add Show</Button>
          <Accordion type="multiple" defaultValue={["item-1"]}  className="w-full">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="pl-8 scroll-m-20 text-2xl font-semibold tracking-tight hover:no-underline">Currently Watching</AccordionTrigger>
              <AccordionContent>
                <WatchingList watchedShows={watchedShows} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}

