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
    ResponsiveContainer
} from "recharts"

interface ProjectVelocityChartProps {
    projectId: string
}

export function ProjectVelocityChart({ projectId }: ProjectVelocityChartProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const velocityData = useMemo(() => {
        if (!project) return []

        return project.metrics.sprintVelocity.map((velocity, index) => ({
            sprint: `Sprint ${index + 1}`,
            points: velocity
        }))
    }, [project])

    if (!project) return null

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Sprint Velocity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={velocityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="sprint" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="points"
                                fill="#60a5fa"
                                name="Story Points"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}