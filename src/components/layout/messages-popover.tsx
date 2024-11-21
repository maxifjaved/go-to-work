"use client"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {mockData} from "@/components/data-table/data";

// Mock messages data
const messages = mockData.users.slice(0, 5).map(user => ({
    id: user.id,
    user,
    message: "Hey, can you check the latest updates on the project?",
    timestamp: new Date(Date.now() - Math.random() * 1000000000),
    unread: Math.random() > 0.5,
}))

export function MessagesPopover({
                                    children,
                                }: {
    children: React.ReactNode
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <div className="flex items-center justify-between border-b p-4">
                    <h4 className="text-sm font-semibold">Messages</h4>
                    <Button variant="ghost" size="sm">
                        Mark all as read
                    </Button>
                </div>
                <ScrollArea className="h-[300px]">
                    <div className="space-y-4 p-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className="flex items-start gap-4 rounded-lg p-2 hover:bg-muted"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={message.user.avatar} />
                                    <AvatarFallback>
                                        {message.user.name.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">
                                            {message.user.name}
                                        </p>
                                        {message.unread && (
                                            <span className="h-2 w-2 rounded-full bg-blue-600" />
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {message.message}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(message.timestamp), {
                                            addSuffix: true,
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="border-t p-4">
                    <Button variant="outline" className="w-full">
                        View all messages
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}