"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAnalytics } from "./analytics-context"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"
import { startOfDay, isWithinInterval, format, startOfWeek, startOfMonth } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface ProjectTrendAnalysisProps {
    projectId: string
}

export function ProjectTrendAnalysis({ projectId }: ProjectTrendAnalysisProps) {
    const { dateRange, groupBy } = useAnalytics()
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const trendData = useMemo(() => {
        if (!project || !dateRange?.from || !dateRange?.to) return []

        const tasks = mockData.tasks.filter(task => task.projectId === project.id)

        const tasksInRange = tasks.filter(task => {
            const taskDate = startOfDay(new Date(task.createdAt))
            return isWithinInterval(taskDate, {
                start: startOfDay(dateRange.from),
                end: startOfDay(dateRange.to)
            })
        })

        // Group tasks based on selected grouping
        const groupedTasks = tasksInRange.reduce((acc, task) => {
            const date = new Date(task.createdAt)
            let groupKey: string

            switch (groupBy) {
                case "week":
                    groupKey = format(startOfWeek(date), "MMM d")
                    break
                case "month":
                    groupKey = format(startOfMonth(date), "MMM yyyy")
                    break
                default:
                    groupKey = format(date, "MMM d")
            }

            if (!acc[groupKey]) {
                acc[groupKey] = {
                    date: groupKey,
                    totalTasks: 0,
                    completedTasks: 0,
                    avgCompletionTime: 0,
                }
            }

            acc[groupKey].totalTasks++
            if (task.status === 'Done') {
                acc[groupKey].completedTasks++
                const completionTime = new Date(task.completedAt || '').getTime() - new Date(task.createdAt).getTime()
                acc[groupKey].avgCompletionTime += completionTime / (1000 * 60 * 60 * 24)
            }

            return acc
        }, {} as Record<string, any>)

        // Convert to array and calculate averages
        return Object.entries(groupedTasks).map(([date, data]) => ({
            date,
            totalTasks: data.totalTasks,
            completedTasks: data.completedTasks,
            completionRate: Math.round((data.completedTasks / data.totalTasks) * 100),
            avgCompletionTime: Math.round(data.avgCompletionTime / data.completedTasks || 0),
        }))
    }, [project, dateRange, groupBy])

    if (!project || trendData.length === 0) return null

    // Calculate trend indicators
    const currentPeriod = trendData[trendData.length - 1]
    const previousPeriod = trendData[trendData.length - 2]
    const trends = {
        completionRate: currentPeriod.completionRate - (previousPeriod?.completionRate || 0),
        avgCompletionTime: currentPeriod.avgCompletionTime - (previousPeriod?.avgCompletionTime || 0),
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Trend Analysis</CardTitle>
                <div className="flex gap-2">
                    <Badge variant={trends.completionRate >= 0 ? "default" : "destructive"}>
                        {trends.completionRate >= 0 ? "↑" : "↓"} {Math.abs(trends.completionRate)}% Completion
                    </Badge>
                    <Badge variant={trends.avgCompletionTime <= 0 ? "default" : "destructive"}>
                        {trends.avgCompletionTime <= 0 ? "↓" : "↑"} {Math.abs(trends.avgCompletionTime)}d Cycle Time
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="completionRate"
                                name="Completion Rate (%)"
                                stroke="#4ade80"
                                strokeWidth={2}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="avgCompletionTime"
                                name="Avg. Completion Time (days)"
                                stroke="#f97316"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}