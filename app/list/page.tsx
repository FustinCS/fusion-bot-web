"use client";

import Navbar from "@/components/ui/custom/navbar";
import CrudButtons from "@/components/ui/custom/tv-list/crud-buttons";
import CurrentWatchingTable from "@/components/ui/custom/tv-list/currently-watching-table";
import TvProfileInformation from "@/components/ui/custom/tv-list/tv-profile-info";
import { Watch } from "@/utils/types";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

export default function ListPage() {
  const { data: session, status } = useSession();

  const [data, setData] = useState<Watch[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [addShowName, setAddShowName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/database/get-watched-tv?user_id=${session?.user.id}`
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [session?.user.id]);

  const handleAddShow = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/database/add-watched-tv`, {
        method: "POST",
        body: JSON.stringify({
          showName: addShowName,
          userId: session?.user.id,
        }),
      });
      setAddShowName("");

      if (!response.ok) {
        throw new Error("Failed to add show");
      }

      const result = await response.json();
      const addedShow = result.showData; // Access showData from parsed JSON
      setAddShowName("");
      setData([addedShow, ...data]);
    } catch (err) {
      alert("Failed to add show");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  if (status === "loading" || !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!session) {
    return (
      <main className="flex flex-col min-h-screen overflow-auto">
        <Navbar />
        <div className="flex-auto flex justify-center items-center">
        <Card>
          <CardContent className="flex flex-col gap-8 p-16">
            <h1 className="text-2xl font-semibold">Sign in to view your list</h1>
            <Button
              className="flex gap-2 bg-[#5865F2] text-white hover:bg-[#6873f1]"
              onClick={() => signIn("discord")}
              >
                <DiscordLogoIcon/>
                Login with Discord
              </Button>
          </CardContent>
        </Card>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col w-8/12">
          <TvProfileInformation userInfo={session.user} />
          <CrudButtons setOpen={setOpen} />
          <CurrentWatchingTable data={data} setData={setData} />
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] border-secondary border-2">
          <DialogHeader>
            <DialogTitle>Add Show</DialogTitle>
            <DialogDescription>
              Enter a show name to add it to your list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Show Name</Label>
            <Input
              value={addShowName}
              onChange={(e) => setAddShowName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddShow} disabled={isLoading}>
              Add Show
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
