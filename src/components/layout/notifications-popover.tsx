"use client"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { Check, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {mockData} from "@/components/data-table/data";

export function NotificationsPopover({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    const notifications = mockData.tasks
        .filter(task => !task.isRead && task.assigneeId === mockData.users[0].id)
        .map(task => ({
            id: task.id,
            title: task.title,
            message: `You have been assigned to ${task.title}`,
            timestamp: task.updatedAt,
            user: mockData.users.find(u => u.id === task.reporterId),
        }))
        .slice(0, 5)

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <div className="flex items-center justify-between border-b p-4">
                    <h4 className="text-sm font-semibold">Notifications</h4>
                    <Button variant="ghost" size="sm">
                        Mark all as read
                    </Button>
                </div>
                <ScrollArea className="h-[300px]">
                    <div className="space-y-4 p-4">
                        {notifications.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                No new notifications
                            </p>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="flex items-start gap-4 rounded-lg p-2 hover:bg-muted"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={notification.user?.avatar} />
                                        <AvatarFallback>
                                            {notification.user?.name.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(notification.timestamp), {
                                                addSuffix: true,
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Check className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
                <div className="border-t p-4">
                    <Button variant="outline" className="w-full">
                        View all notifications
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}