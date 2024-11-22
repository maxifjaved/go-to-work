"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ProjectActivityProps {
    projectId: string
}

export function ProjectActivity({ projectId }: ProjectActivityProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const activities = useMemo(() => {
        if (!project) return []

        return mockData.tasks
            .filter(task => task.projectId === project.id)
            .flatMap(task =>
                task.activity.map(activity => ({
                    ...activity,
                    task,
                    user: mockData.users.find(u => u.id === activity.userId)
                }))
            )
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }, [project])

    if (!project) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity Feed</CardTitle>
                <CardDescription>
                    Recent activity in the project
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex gap-4">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={activity.user?.avatar} />
                                <AvatarFallback>
                                    {activity.user?.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <p className="text-sm">
                  <span className="font-medium">
                    {activity.user?.name}
                  </span>
                                    {' '}
                                    {activity.action.split('_').join(' ').toLowerCase()}
                                    {' '}
                                    <span className="font-medium">
                    {activity.task.title}
                  </span>
                                </p>
                                {activity.details.field && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>Changed {activity.details.field} from</span>
                                        <Badge variant="outline">
                                            {activity.details.oldValue}
                                        </Badge>
                                        <span>to</span>
                                        <Badge variant="outline">
                                            {activity.details.newValue}
                                        </Badge>
                                    </div>
                                )}
                                {activity.details.comment && (
                                    <p className="text-sm text-muted-foreground">
                                        {activity.details.comment}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}