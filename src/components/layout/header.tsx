"use client"

import { Button } from "@/components/ui/button"
import {
    MenuIcon,
    Search,
    Bell,
    MessageSquare,
    HelpCircle,
    Plus,
} from "lucide-react"
import { UserNav } from "./user-nav"
import { ModeToggle } from "@/components/layout/mode-toggle"
// import { QuickNav } from "./quick-nav"
import { Breadcrumbs } from "./breadcrumbs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NotificationsPopover } from "./notifications-popover"
import { MessagesPopover } from "./messages-popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {mockData} from "@/components/data-table/data";

interface HeaderProps {
    isSidebarOpen: boolean
    onMenuClick: () => void
}

export function Header({ isSidebarOpen, onMenuClick }: HeaderProps) {
    const unreadNotifications = mockData.tasks.filter(
        task => !task.isRead && task.assigneeId === mockData.users[0].id
    ).length

    const unreadMessages = 3 // This would come from your messages data

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="flex h-16 items-center gap-4 px-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={onMenuClick}
                >
                    <MenuIcon className="h-6 w-6" />
                </Button>

                <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/*<QuickNav />*/}
                        <Separator orientation="vertical" className="h-6" />
                        <Breadcrumbs />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px]">
                                    <DropdownMenuItem>New Project</DropdownMenuItem>
                                    <DropdownMenuItem>New Task</DropdownMenuItem>
                                    <DropdownMenuItem>New Document</DropdownMenuItem>
                                    <DropdownMenuItem>New Team</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button
                                variant="outline"
                                size="icon"
                                className="relative w-12"
                            >
                                {/*<Search className="h-4 w-4" />*/}
                                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                                    <span className="text-xs">⌘</span> K
                                </kbd>
                            </Button>

                            <NotificationsPopover>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="relative"
                                >
                                    <Bell className="h-4 w-4" />
                                    {unreadNotifications > 0 && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0"
                                        >
                                            {unreadNotifications}
                                        </Badge>
                                    )}
                                </Button>
                            </NotificationsPopover>

                            <MessagesPopover>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="relative"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    {unreadMessages > 0 && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0"
                                        >
                                            {unreadMessages}
                                        </Badge>
                                    )}
                                </Button>
                            </MessagesPopover>

                            <Button
                                variant="outline"
                                size="icon"
                            >
                                <HelpCircle className="h-4 w-4" />
                            </Button>

                            <ModeToggle />
                        </div>

                        <Separator orientation="vertical" className="h-6" />

                        <UserNav />
                    </div>
                </div>
            </div>
        </header>
    )
}