import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { Button } from "../button";

export default function Navbar() {
    return (
        <nav className="flex justify-center h-16 my-4">
            <div className="flex items-center gap-16 bg-card p-8 rounded-full border-4 border-accent mx-16">
                <div>
                    <h1>Fusion</h1>
                </div>
                <div>
                    <Button variant="ghost">My List</Button>
                </div>
                <div>
                    <ToggleTheme />
                </div>
            </div>
        </nav>
    )
}