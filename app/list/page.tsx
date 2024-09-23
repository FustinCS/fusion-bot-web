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

export default function ListPage() {
  const { data: session, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Access Denied</div>;

  return (
    <main className="bg-background h-screen">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-8/12">
          <ProfileInformation session={session}></ProfileInformation>
          <Accordion type="multiple" defaultValue={["item-1"]}  className="w-full">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="pl-8 scroll-m-20 text-2xl font-semibold tracking-tight hover:no-underline">Currently Watching</AccordionTrigger>
              <AccordionContent>
                <WatchingList />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}

