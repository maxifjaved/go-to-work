"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart2,
    CheckCircle2,
    Clock,
    Users,
    Folder,
    AlertCircle
} from "lucide-react"
import {mockData} from "@/components/data-table/data";

export function DashboardMetrics() {
    // Calculate metrics from mock data
    const totalProjects = mockData.projects.length
    const totalTasks = mockData.tasks.length
    const completedTasks = mockData.tasks.filter(task => task.status === 'Done').length
    const totalUsers = mockData.users.length
    const overdueTasks = mockData.tasks.filter(
        task => new Date(task.dueDate) < new Date() && task.status !== 'Done'
    ).length
    const avgCompletionRate = Math.round((completedTasks / totalTasks) * 100)

    const metrics = [
        {
            title: "Total Projects",
            value: totalProjects,
            icon: Folder,
            description: "Active projects"
        },
        {
            title: "Total Tasks",
            value: totalTasks,
            icon: BarChart2,
            description: "Across all projects"
        },
        {
            title: "Completed Tasks",
            value: completedTasks,
            icon: CheckCircle2,
            description: `${avgCompletionRate}% completion rate`
        },
        {
            title: "Team Members",
            value: totalUsers,
            icon: Users,
            description: "Active members"
        },
        {
            title: "Overdue Tasks",
            value: overdueTasks,
            icon: AlertCircle,
            description: "Need attention"
        },
        {
            title: "Avg. Completion Time",
            value: "4.2 days",
            icon: Clock,
            description: "Per task"
        }
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {metric.title}
                        </CardTitle>
                        <metric.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {metric.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}