"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import {mockData} from "@/components/data-table/data";

interface RecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}

export function RecentActivity({ className, ...props }: RecentActivityProps) {
    // Get recent activities from tasks
    const recentActivities = mockData.tasks
        .flatMap(task =>
            task.activity.map(activity => ({
                ...activity,
                taskTitle: task.title,
                taskKey: task.key
            }))
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10)

    return (
        <Card className={cn(className)} {...props}>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {recentActivities.map((activity, index) => {
                        const user = mockData.users.find(u => u.id === activity.userId)

                        return (
                            <div key={index} className="flex items-start">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user?.avatar} />
                                    <AvatarFallback>
                                        {user?.name.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium">
                                        <span className="font-semibold">{user?.name}</span>
                                        {' '}
                                        {activity.action.replace('_', ' ')}
                                        {' '}
                                        <span className="font-semibold">{activity.taskKey}</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}