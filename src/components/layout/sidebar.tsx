"use client"

import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Users,
    BarChart3,
    Settings,
    PlusCircle,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const sidebarNavItems = [
    {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Projects",
        href: "/projects",
        icon: FolderKanban,
    },
    {
        title: "Tasks",
        href: "/tasks",
        icon: CheckSquare,
    },
    {
        title: "Team",
        href: "/team",
        icon: Users,
    },
    {
        title: "Reports",
        href: "/reports",
        icon: BarChart3,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="hidden border-r bg-background lg:block lg:w-64">
            <div className="flex flex-col gap-4 p-4">
                <div className="flex h-16 items-center border-b px-2">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <span className="text-xl">🚀</span>
                        <span>PM System</span>
                    </Link>
                </div>
                <Button className="w-full justify-start gap-2">
                    <PlusCircle className="h-4 w-4" />
                    New Project
                </Button>
                <nav className="grid gap-1">
                    {sidebarNavItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    pathname === item.href
                                        ? "bg-accent text-accent-foreground"
                                        : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}