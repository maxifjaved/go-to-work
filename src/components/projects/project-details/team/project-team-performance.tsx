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
    Legend,
    ResponsiveContainer,
} from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface ProjectTeamPerformanceProps {
    projectId: string
}

export function ProjectTeamPerformance({ projectId }: ProjectTeamPerformanceProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const teamPerformance = useMemo(() => {
        if (!project?.teamMembers) return []

        return project.teamMembers.map(member => {
            const user = mockData.users.find(u => u.id === member.id)
            const tasks = mockData.tasks.filter(
                task => task.projectId === project.id && task.assigneeId === member.id
            )
            const completedTasks = tasks.filter(task => task.status === 'Done')
            const inProgressTasks = tasks.filter(task => task.status === 'In Progress')
            const overdueTasks = tasks.filter(
                task => new Date(task.dueDate) < new Date() && task.status !== 'Done'
            )

            return {
                id: member.id,
                name: user?.name || 'Unknown',
                avatar: user?.avatar,
                completed: completedTasks.length,
                inProgress: inProgressTasks.length,
                overdue: overdueTasks.length,
                efficiency: tasks.length ? (completedTasks.length / tasks.length) * 100 : 0,
            }
        }).sort((a, b) => b.completed - a.completed)
    }, [project])

    if (!project || teamPerformance.length === 0) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={teamPerformance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    tickFormatter={(value) => value.split(' ')[0]}
                                />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="completed" name="Completed" fill="#4ade80" />
                                <Bar dataKey="inProgress" name="In Progress" fill="#60a5fa" />
                                <Bar dataKey="overdue" name="Overdue" fill="#f87171" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-6">
                        {teamPerformance.map(member => (
                            <div key={member.id} className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>
                                        {member.name.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{member.name}</span>
                                        <span className="text-muted-foreground">
                      {member.completed + member.inProgress} total tasks
                    </span>
                                    </div>
                                    <Progress value={member.efficiency} />
                                    <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                                        <div>Completed: {member.completed}</div>
                                        <div>In Progress: {member.inProgress}</div>
                                        <div>Overdue: {member.overdue}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}