import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function WatchingList() {
    return(
        <Card className="w-full bg-card border-secondary p-8">
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <Label>Series Title</Label>
                        <Input placeholder="Series Title" />
                    </div>
                    <div className="flex gap-4">
                        <Label>Episode</Label>
                        <Input placeholder="Episode" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Add</Button>
            </CardFooter>
        </Card>
    )

}