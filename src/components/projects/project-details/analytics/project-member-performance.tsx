"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import {cn} from "@/lib/utils";

interface ProjectMemberPerformanceProps {
    projectId: string
}

export function ProjectMemberPerformance({ projectId }: ProjectMemberPerformanceProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const performanceData = useMemo(() => {
        if (!project) return []

        return project.teamMembers?.map(member => {
            const user = mockData.users.find(u => u.id === member.id)
            const tasks = mockData.tasks.filter(
                task => task.projectId === project.id && task.assigneeId === member.id
            )
            const completedTasks = tasks.filter(task => task.status === 'Done')
            const overdueTasks = tasks.filter(
                task => new Date(task.dueDate) < new Date() && task.status !== 'Done'
            )

            const completionRate = tasks.length
                ? (completedTasks.length / tasks.length) * 100
                : 0

            const avgCompletionTime = completedTasks.length
                ? completedTasks.reduce((sum, task) => {
                const start = new Date(task.startDate || task.createdAt)
                const end = new Date(task.completedAt || '')
                return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
            }, 0) / completedTasks.length
                : 0

            return {
                id: member.id,
                name: user?.name || 'Unknown',
                avatar: user?.avatar,
                role: user?.role,
                tasks: tasks.length,
                completed: completedTasks.length,
                overdue: overdueTasks.length,
                completionRate,
                avgCompletionTime: Math.round(avgCompletionTime * 10) / 10,
                storyPoints: tasks.reduce((sum, task) => sum + task.storyPoints, 0),
                efficiency: tasks.length
                    ? (completedTasks.reduce((sum, task) => sum + task.storyPoints, 0) /
                    tasks.reduce((sum, task) => sum + task.storyPoints, 0)) * 100
                    : 0
            }
        }) || []
    }, [project])

    if (!project || performanceData.length === 0) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Member Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    tickFormatter={(value) => value.split(' ')[0]}
                                />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    yAxisId="left"
                                    dataKey="storyPoints"
                                    name="Story Points"
                                    fill="#60a5fa"
                                />
                                <Bar
                                    yAxisId="right"
                                    dataKey="completionRate"
                                    name="Completion Rate (%)"
                                    fill="#4ade80"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Tasks</TableHead>
                                <TableHead>Story Points</TableHead>
                                <TableHead>Completion Rate</TableHead>
                                <TableHead>Avg. Time</TableHead>
                                <TableHead>Efficiency</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {performanceData.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback>
                                                    {member.name.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{member.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {member.role}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            {member.completed}/{member.tasks} completed
                                        </div>
                                        {member.overdue > 0 && (
                                            <div className="text-sm text-red-500">
                                                {member.overdue} overdue
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>{member.storyPoints}</TableCell>
                                    <TableCell>
                                        <div className="w-[100px]">
                                            <div className="text-sm">
                                                {Math.round(member.completionRate)}%
                                            </div>
                                            <Progress value={member.completionRate} />
                                        </div>
                                    </TableCell>
                                    <TableCell>{member.avgCompletionTime} days</TableCell>
                                    <TableCell>
                                        <div className={cn(
                                            "text-sm",
                                            member.efficiency >= 80 ? "text-green-500" :
                                                member.efficiency >= 60 ? "text-yellow-500" :
                                                    "text-red-500"
                                        )}>
                                            {Math.round(member.efficiency)}%
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}