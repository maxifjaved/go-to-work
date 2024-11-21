"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Users,
    CheckCircle2,
    Clock,
    TrendingUp,
    Briefcase
} from "lucide-react"
import {mockData} from "@/components/data-table/data";

export function TeamStats() {
    // Calculate team statistics
    const totalMembers = mockData.users.length
    const activeProjects = new Set(mockData.tasks.map(task => task.projectId)).size
    const completedTasks = mockData.tasks.filter(task => task.status === 'Done').length
    const avgCompletionTime = 4.2 // This would be calculated from actual data
    const teamUtilization = 78 // This would be calculated from actual data

    const stats = [
        {
            title: "Team Members",
            value: totalMembers,
            icon: Users,
            description: "Active members"
        },
        {
            title: "Active Projects",
            value: activeProjects,
            icon: Briefcase,
            description: "Current projects"
        },
        {
            title: "Completed Tasks",
            value: completedTasks,
            icon: CheckCircle2,
            description: "This month"
        },
        {
            title: "Avg. Completion Time",
            value: `${avgCompletionTime} days`,
            icon: Clock,
            description: "Per task"
        },
        {
            title: "Team Utilization",
            value: `${teamUtilization}%`,
            icon: TrendingUp,
            description: "Current sprint"
        }
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}