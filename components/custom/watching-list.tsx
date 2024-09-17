import {
  Card,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

export default function WatchingList() {
  return (
    <Card className="w-full bg-card border-secondary">
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
          <TableRow>
            <TableCell className="font-medium">
              <div className="flex gap-6 m-4 items-center">
                <div className="w-[48px] lg:w-[48px]">
                  <AspectRatio ratio={1}>
                    <Image
                      src={
                        "https://cdn.discordapp.com/avatars/251839702951264257/1b4ab9724e8b93037978eeb3c49d3ed1.png"
                      }
                      alt={"Unknown"}
                      className="rounded-md object-center object-cover"
                      width={50}
                      height={50}
                    />
                  </AspectRatio>
                </div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Placeholder Show Name
                </h4>
              </div>
            </TableCell>
            <TableCell className="text-center text-lg">
                1
            </TableCell>
            <TableCell className="text-center text-lg">
                0/12
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
