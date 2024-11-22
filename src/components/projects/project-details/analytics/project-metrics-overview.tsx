"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    TrendingUp,
    TrendingDown,
    Clock,
    Target,
    CheckCircle2,
    AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectMetricsOverviewProps {
    projectId: string
}

export function ProjectMetricsOverview({ projectId }: ProjectMetricsOverviewProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const metrics = useMemo(() => {
        if (!project) return null

        const tasks = mockData.tasks.filter(task => task.projectId === project.id)
        const completedTasks = tasks.filter(task => task.status === 'Done')
        const overdueTasks = tasks.filter(
            task => new Date(task.dueDate) < new Date() && task.status !== 'Done'
        )

        const lastSprint = project.metrics.sprintVelocity.slice(-2)
        const velocityTrend = lastSprint[1] - lastSprint[0]
        const velocityChange = (velocityTrend / lastSprint[0]) * 100

        return {
            velocity: {
                current: lastSprint[1],
                trend: velocityTrend,
                percentage: velocityChange
            },
            cycleTime: {
                value: project.metrics.averageCycleTime,
                trend: -0.5 // Example trend
            },
            completion: {
                total: tasks.length,
                completed: completedTasks.length,
                percentage: (completedTasks.length / tasks.length) * 100
            },
            issues: {
                overdue: overdueTasks.length,
                blocked: tasks.filter(t => t.isBlocked).length,
                total: overdueTasks.length + tasks.filter(t => t.isBlocked).length
            }
        }
    }, [project])

    if (!project || !metrics) return null

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sprint Velocity</CardTitle>
                    {metrics.velocity.trend > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{metrics.velocity.current} points</div>
                    <p className={cn(
                        "text-xs",
                        metrics.velocity.percentage > 0 ? "text-green-500" : "text-red-500"
                    )}>
                        {metrics.velocity.percentage > 0 ? "+" : ""}
                        {metrics.velocity.percentage.toFixed(1)}% from last sprint
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cycle Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{metrics.cycleTime.value} days</div>
                    <p className={cn(
                        "text-xs",
                        metrics.cycleTime.trend < 0 ? "text-green-500" : "text-red-500"
                    )}>
                        {metrics.cycleTime.trend > 0 ? "+" : ""}
                        {metrics.cycleTime.trend} days from average
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {metrics.completion.percentage.toFixed(1)}%
                    </div>
                    <div className="mt-2">
                        <Progress value={metrics.completion.percentage} />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                        {metrics.completion.completed} of {metrics.completion.total} tasks completed
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Issues</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{metrics.issues.total}</div>
                    <div className="mt-2 space-y-1">
                        <div className="text-xs text-muted-foreground">
                            {metrics.issues.overdue} overdue tasks
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {metrics.issues.blocked} blocked tasks
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}