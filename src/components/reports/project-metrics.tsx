"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    CircleOff,
    Clock,
    Check,
    AlertTriangle,
    TrendingUp,
} from "lucide-react"
import {cn} from "@/lib/utils";
import {mockData} from "@/components/data-table/data";

export function ProjectMetrics() {
    // Calculate metrics
    const totalTasks = mockData.tasks.length
    const completedTasks = mockData.tasks.filter(
        task => task.status === 'Done'
    ).length
    const overdueTasks = mockData.tasks.filter(
        task => new Date(task.dueDate) < new Date() && task.status !== 'Done'
    ).length
    const blockedTasks = mockData.tasks.filter(
        task => task.isBlocked
    ).length
    const avgCompletionRate = Math.round((completedTasks / totalTasks) * 100)

    const metrics = [
        {
            title: "Task Completion Rate",
            value: `${avgCompletionRate}%`,
            description: `${completedTasks} of ${totalTasks} tasks completed`,
            icon: TrendingUp,
            trend: +5,
        },
        {
            title: "Completed Tasks",
            value: completedTasks,
            description: "In the last 30 days",
            icon: Check,
            trend: +12,
        },
        {
            title: "Overdue Tasks",
            value: overdueTasks,
            description: "Needs attention",
            icon: AlertTriangle,
            trend: -2,
        },
        {
            title: "Blocked Tasks",
            value: blockedTasks,
            description: "Waiting for resolution",
            icon: CircleOff,
            trend: -1,
        },
        {
            title: "Avg Time to Complete",
            value: "3.2 days",
            description: "Per task",
            icon: Clock,
            trend: -0.5,
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
                        <div className={cn(
                            "text-xs font-medium mt-2",
                            metric.trend > 0 ? "text-green-600" : "text-red-600"
                        )}>
                            {metric.trend > 0 ? "+" : ""}{metric.trend}% from last month
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}