import { NavLink } from "react-router";  // Use NavLink for active link
import { Dumbbell, Home, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";

export function Navbar() {
    return (
        <>
            {/* for screens bigger than sm */}
            <nav className="bg-background border-b sm:block hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <h1 className="text-2xl font-bold flex items-center space-x-2">
                                <Dumbbell className="h-6 w-6 text-primary" />
                                <span><NavLink to="/">GainsBook</NavLink></span>
                            </h1>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <NavItem to="/" icon={<Home className="h-5 w-5" />}>
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
                            <ModeToggle />
                            <Button variant="ghost" size="icon">
                                <Settings className="h-5 w-5" />
                            </Button>
                            <NavLink to="/profile">
                                <Avatar className="ml-3">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navbar (Bottom) */}
            <nav className="bg-background fixed bottom-0 left-0 right-0 sm:hidden flex justify-around items-center border-t z-10 p-2.5">
                <NavItem to="/" icon={<Home className="h-6 w-6" />}>
                    Home
                </NavItem>
                <NavItem to="/exercises" icon={<Dumbbell className="h-6 w-6" />}>
                    Exercises
                </NavItem>
                <NavItem to="/history" icon={<Calendar className="h-6 w-6" />}>
                    History
                </NavItem>
                <NavItem to="/profile" icon={<Avatar className="h-6 w-6">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>}>
                    Profile
                </NavItem>
            </nav>

            {/* Mobile ModeToggle (Floating Top) */}
            {/* <div className="fixed top-2 right-2 sm:hidden z-20 rounded-full bg-popover">
                <ModeToggle />
            </div> */}
        </>
    );
}

function NavItem({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `inline-flex flex-col items-center px-1 pt-1 text-sm font-medium ${isActive ? "text-primary" : "text-foreground"} hover:text-primary sm:flex-row`
            }
        >
            {icon}
            <span className="text-xs mt-1 sm:ml-2">{children}</span>
        </NavLink>
    );
}
