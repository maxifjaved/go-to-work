"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts"

interface ProjectTaskDistributionProps {
    projectId: string
}

const COLORS = {
    'Backlog': '#94a3b8',
    'Todo': '#60a5fa',
    'In Progress': '#fbbf24',
    'In Review': '#a855f7',
    'Done': '#4ade80',
    'Archived': '#6b7280'
}

const PRIORITY_COLORS = {
    'Low': '#94a3b8',
    'Medium': '#60a5fa',
    'High': '#f97316',
    'Urgent': '#ef4444'
}

export function ProjectTaskDistribution({ projectId }: ProjectTaskDistributionProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const distributionData = useMemo(() => {
        if (!project) return { status: [], priority: [] }

        const tasks = mockData.tasks.filter(task => task.projectId === project.id)

        // Status distribution
        const statusCount = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        const statusData = Object.entries(statusCount).map(([name, value]) => ({
            name,
            value,
            color: COLORS[name as keyof typeof COLORS]
        }))

        // Priority distribution
        const priorityCount = tasks.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        const priorityData = Object.entries(priorityCount).map(([name, value]) => ({
            name,
            value,
            color: PRIORITY_COLORS[name as keyof typeof PRIORITY_COLORS]
        }))

        return { status: statusData, priority: priorityData }
    }, [project])

    if (!project) return null

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="mb-4 text-sm font-medium text-center">By Status</h4>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={distributionData.status}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={30}
                                        outerRadius={70}
                                        paddingAngle={2}
                                    >
                                        {distributionData.status.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-medium text-center">By Priority</h4>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={distributionData.priority}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={30}
                                        outerRadius={70}
                                        paddingAngle={2}
                                    >
                                        {distributionData.priority.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}