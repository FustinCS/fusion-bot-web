"use client";

import Navbar from "@/components/ui/custom/navbar";
import CurrentWatchingTable from "@/components/ui/custom/tv-list/currently-watching-table";
import TvProfileInformation from "@/components/ui/custom/tv-list/tv-profile-info";
import { useSession } from "next-auth/react";

export default function ListPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center">
          <div className="flex flex-col w-8/12">
            <h1>Please Log In to Continue!</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col w-8/12">
          <TvProfileInformation userInfo={session.user}/>
          <CurrentWatchingTable userInfo={session.user}/>
        </div>
      </div>
    </>
  );
}
