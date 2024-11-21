"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"
import {mockData} from "@/components/data-table/data";

interface TasksOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}

export function TasksOverview({ className, ...props }: TasksOverviewProps) {
    // Process tasks data for the chart
    const tasksByStatus = mockData.tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const chartData = Object.entries(tasksByStatus).map(([status, count]) => ({
        status,
        count
    }))

    return (
        <Card className={cn("col-span-4", className)} {...props}>
            <CardHeader>
                <CardTitle>Tasks Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="status" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#adfa1d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}