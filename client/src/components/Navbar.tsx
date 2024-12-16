import { Link } from "react-router";
import { Dumbbell, Home, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";

export function Navbar() {
    return (
        <nav className="bg-background border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <h1 className="text-2xl font-bold flex items-center space-x-2">
                            <Dumbbell className="h-6 w-6 text-primary" /> {/* Adjust size with `h-6 w-6` classes */}
                            <span><Link to="/">GymBook</Link></span>
                        </h1>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <NavItem to="/profile" icon={<Home className="h-5 w-5" />}>
                            Home
                        </NavItem>
                        <NavItem to="/exercises" icon={<Dumbbell className="h-5 w-5" />}>
                            Exercises
                        </NavItem>
                        <NavItem to="/history" icon={<Calendar className="h-5 w-5" />}>
                            History
                        </NavItem>
                    </div>
                    <div className="flex items-center">
                        <ModeToggle></ModeToggle>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5" />
                        </Button>
                        <Avatar className="ml-3">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavItem({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <Link
            to={to}
            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary"
        >
            {icon}
            <span className="ml-2">{children}</span>
        </Link>
    );
}
