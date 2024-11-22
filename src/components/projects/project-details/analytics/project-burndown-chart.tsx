"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"

interface ProjectBurndownChartProps {
    projectId: string
}

export function ProjectBurndownChart({ projectId }: ProjectBurndownChartProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const burndownData = useMemo(() => {
        if (!project) return []

        // Get the latest sprint's burndown data
        const latestSprint = mockData.sprints
            .filter(sprint => sprint.projectId === project.id)
            .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())[0]

        if (!latestSprint) return []

        // Calculate ideal burndown line
        const totalDays = latestSprint.metrics.burndownData.length
        const totalPoints = latestSprint.metrics.totalPoints
        const idealBurndown = latestSprint.metrics.burndownData.map((data, index) => {
            const idealPoints = totalPoints - ((totalPoints / (totalDays - 1)) * index)
            return {
                ...data,
                ideal: Math.round(idealPoints)
            }
        })

        return idealBurndown
    }, [project])

    if (!project || burndownData.length === 0) return null

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Sprint Burndown</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={burndownData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="remainingPoints"
                                stroke="#60a5fa"
                                name="Actual"
                                strokeWidth={2}
                            />
                            <Line
                                type="monotone"
                                dataKey="ideal"
                                stroke="#94a3b8"
                                name="Ideal"
                                strokeDasharray="5 5"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}