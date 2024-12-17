import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "./ThemeProvider"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full"// Responsive button size
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {/* Sun Icon */}
            <Sun
                className="h-8 w-8 sm:h-5 sm:w-5 rotate-0 scale-100 transition-transform duration-300 ease-in-out
        dark:-rotate-90 dark:scale-0"
            />
            {/* Moon Icon */}
            <Moon
                className="absolute h-8 w-8 sm:h-5 sm:w-5 rotate-90 scale-0 transition-transform duration-300 ease-in-out
        dark:rotate-0 dark:scale-100"
            />
            <span className="sr-only">Toggle theme</span>
        </Button>


    )
}
