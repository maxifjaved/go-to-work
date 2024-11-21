"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {mockData} from "@/components/data-table/data";

interface TeamOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}

export function TeamOverview({ className, ...props }: TeamOverviewProps) {
    // Calculate team metrics
    const teamMetrics = mockData.users.slice(0, 5).map(user => {
        const assignedTasks = mockData.tasks.filter(task => task.assigneeId === user.id)
        const completedTasks = assignedTasks.filter(task => task.status === 'Done')
        const completionRate = assignedTasks.length
            ? (completedTasks.length / assignedTasks.length) * 100
            : 0

        return {
            ...user,
            assignedTasks: assignedTasks.length,
            completedTasks: completedTasks.length,
            completionRate
        }
    })

    return (
        <Card className={cn(className)} {...props}>
            <CardHeader>
                <CardTitle>Team Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {teamMetrics.map((member) => (
                        <div key={member.id} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>
                                    {member.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1 flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium leading-none">
                                        {member.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {member.completedTasks}/{member.assignedTasks} tasks
                                    </p>
                                </div>
                                <Progress
                                    value={member.completionRate}
                                    className="h-2"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}