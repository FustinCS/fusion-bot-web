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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import fetchShowData from "@/utils/fetchShowData";

export default function ListPage() {
  const { data: session, status } = useSession();
  const [watchedShows, setWatchedShows] = useState<WatchedTVShow[]>([]);
  const [openAddShow, setOpenAddShow] = useState(false);
  const [addShowName, setAddShowName] = useState("");

  useEffect(() => {
    async function fetchWatchedShows() {
      const response = await fetch("/api/tvshows", { method: "GET" });
      const data = await response.json();
      setWatchedShows(data.watchedShows);
    }

    fetchWatchedShows();
  }, []);

  async function handleAddShow() {
    // need to make TVMAZE API call on frontend to update data first
    const showData = await fetchShowData(addShowName);
    
    const watchedShow: WatchedTVShow = {
      Show: {
          name: showData.name,
          season: 1,
          episodeCount: showData.seasons[0].episodeCount,
          image: showData.image,
      },
      currentEpisode: 0,
      currentSeason: 1,
      showId: showData.showId,
      updatedAt: new Date()
  }

    // update state
    setWatchedShows((prev) => [watchedShow, ...prev]);
    setOpenAddShow(false);
    setAddShowName("");
    
    
    // update db
    await fetch("/api/tvshows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        showData: showData,
      }),
    });
  }

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Access Denied</div>;

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-8/12">
          <ProfileInformation session={session}></ProfileInformation>
          <Button onClick={() => setOpenAddShow(true)}>Add Show</Button>
          <Accordion
            type="multiple"
            defaultValue={["item-1"]}
            className="w-full"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="pl-8 scroll-m-20 text-2xl font-semibold tracking-tight hover:no-underline">
                Currently Watching
              </AccordionTrigger>
              <AccordionContent>
                <WatchingList watchedShows={watchedShows} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Dialog open={openAddShow} onOpenChange={setOpenAddShow}>
        <DialogContent className="sm:max-w-[425px] border-secondary border-2">
          <DialogHeader>
            <DialogTitle>Add Show</DialogTitle>
            <DialogDescription>
              Enter a show name to add it to your list.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={addShowName}
            onChange={(e) => setAddShowName(e.target.value)}
            placeholder="Show Name"
            className="col-span-1"
          />
          <DialogFooter>
            <Button onClick={handleAddShow}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
