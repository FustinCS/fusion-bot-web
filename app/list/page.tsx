import Navbar from "@/components/ui/custom/navbar";
import CurrentWatchingTable from "@/components/ui/custom/tv-list/currently-watching-table";
import TvProfileInformation from "@/components/ui/custom/tv-list/tv-profile-info";

export default function ListPage() {
    return (
        <>
            <Navbar />
            <div className="flex justify-center">
                <div className="flex flex-col w-8/12">
                    <TvProfileInformation />
                    <CurrentWatchingTable />
                </div>
            </div>
        </>
    )
}