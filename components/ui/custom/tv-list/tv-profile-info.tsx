import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { User } from "next-auth";

export default function TvProfileInformation({ userInfo }: { userInfo: User }) {
  
  return (
    <div className="flex gap-6 m-4 items-end">
      <div className="w-[64px] lg:w-[128px]">
        <AspectRatio ratio={1}>
          <Image
            src={userInfo.image || ""} 
            alt={userInfo.name || "Unknown"}
            className="rounded-md object-center object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </AspectRatio>
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold lg:text-5xl pb-4">Fustin</h1>
    </div>
  );
}
