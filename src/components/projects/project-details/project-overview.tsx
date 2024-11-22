"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockData } from "@/components/data-table/data"
import { useMemo } from "react"
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts"
import {
    Calendar,
    Clock,
    Users,
    CheckCircle2,
    AlertCircle
} from "lucide-react"

interface ProjectOverviewProps {
    projectId: string
}

const COLORS = ['#94a3b8', '#60a5fa', '#4ade80', '#f87171']

export function ProjectOverview({ projectId }: ProjectOverviewProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    if (!project) return null

    const metrics = [
        {
            title: "Time Remaining",
            value: "24 days",
            description: "Until deadline",
            icon: Calendar
        },
        {
            title: "Team Members",
            value: project.teamMembers?.length ?? 0,
            description: "Active members",
            icon: Users
        },
        {
            title: "Tasks Completed",
            value: `${project.completedTasksCount}/${project.tasksCount}`,
            description: "Total tasks",
            icon: CheckCircle2
        },
        {
            title: "Overdue Tasks",
            value: project.metrics.overdueCards,
            description: "Need attention",
            icon: AlertCircle
        }
    ]

    const taskDistribution = {
        'Backlog': project.metrics.taskDistribution.Backlog,
        'In Progress': project.metrics.taskDistribution['In Progress'],
        'In Review': project.metrics.taskDistribution['In Review'],
        'Done': project.metrics.taskDistribution.Done
    }

    // Convert task distribution for pie chart
    const taskDistributionData = Object.entries(taskDistribution).map(([name, value]) => ({
        name,
        value
    }))

    // Create velocity data
    const velocityData = project.metrics.sprintVelocity.map((value, index) => ({
        sprint: `Sprint ${index + 1}`,
        completed: value
    }))

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Task Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={taskDistributionData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {taskDistributionData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Sprint Velocity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={velocityData}>
                                    <XAxis dataKey="sprint" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="completed" fill="#60a5fa" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}