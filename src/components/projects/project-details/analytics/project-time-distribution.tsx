"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"
import {cn} from "@/lib/utils";

interface ProjectTimeDistributionProps {
    projectId: string
}

export function ProjectTimeDistribution({ projectId }: ProjectTimeDistributionProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const timeData = useMemo(() => {
        if (!project) return []

        const tasks = mockData.tasks.filter(task => task.projectId === project.id)

        // Group tasks by type and calculate time spent
        const timeByType = tasks.reduce((acc, task) => {
            acc[task.type] = {
                estimated: (acc[task.type]?.estimated || 0) + task.estimatedHours,
                actual: (acc[task.type]?.actual || 0) + task.actualHours
            }
            return acc
        }, {} as Record<string, { estimated: number; actual: number }>)

        return Object.entries(timeByType).map(([type, hours]) => ({
            type,
            estimated: hours.estimated,
            actual: hours.actual,
            variance: hours.actual - hours.estimated
        }))
    }, [project])

    if (!project) return null

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Time Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={timeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="estimated"
                                name="Estimated Hours"
                                fill="#60a5fa"
                            />
                            <Bar
                                dataKey="actual"
                                name="Actual Hours"
                                fill="#f97316"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    {timeData.map((item) => (
                        <div key={item.type} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">{item.type}</span>
                                <span className={cn(
                                    "text-xs",
                                    item.variance > 0 ? "text-red-500" : "text-green-500"
                                )}>
                  {item.variance > 0 ? '+' : ''}{item.variance}h
                </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Est: {item.estimated}h / Act: {item.actual}h
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}