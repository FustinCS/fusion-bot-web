import { Session } from "next-auth";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

interface ProfileInformationProps {
  session: Session;
}

export default function ProfileInformation({
  session,
}: ProfileInformationProps) {
  return (
    <div className="flex gap-4 self-start items-end">
      <div className="w-[125px]">
        <AspectRatio ratio={1}>
          <Image
            src={session.user?.image || ""}
            alt={session.user?.name || "Unknown User"}
            fill
            className="rounded-lg border-2 border-primary"
          />
        </AspectRatio>
      </div>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          {session.user?.name || "Unknown User"}
        </h1>
      </div>
    </div>
  );
}
