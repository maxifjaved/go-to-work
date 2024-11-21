"use client"

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
import {mockData} from "@/components/data-table/data";

export function TeamPerformanceReport() {
    // Calculate team performance metrics
    const teamMetrics = mockData.users.map(user => {
        const userTasks = mockData.tasks.filter(task => task.assigneeId === user.id)
        const completedTasks = userTasks.filter(task => task.status === 'Done')
        const overdueTasks = userTasks.filter(
            task => new Date(task.dueDate) < new Date() && task.status !== 'Done'
        )

        const onTimeTasks = completedTasks.filter(task =>
            new Date(task.completedAt || '') <= new Date(task.dueDate)
        )

        return {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            assigned: userTasks.length,
            completed: completedTasks.length,
            overdue: overdueTasks.length,
            onTime: onTimeTasks.length,
            efficiency: userTasks.length
                ? Math.round((completedTasks.length / userTasks.length) * 100)
                : 0,
            onTimeRate: completedTasks.length
                ? Math.round((onTimeTasks.length / completedTasks.length) * 100)
                : 0,
        }
    }).sort((a, b) => b.efficiency - a.efficiency)

    const chartData = teamMetrics.map(metric => ({
        name: metric.name.split(' ')[0],
        Completed: metric.completed,
        Overdue: metric.overdue,
        'On Time': metric.onTime,
    }))

    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>Team Performance Report</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-8">
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Completed" fill="#4ade80" />
                                <Bar dataKey="On Time" fill="#60a5fa" />
                                <Bar dataKey="Overdue" fill="#f87171" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid gap-4">
                        {teamMetrics.map(member => (
                            <div
                                key={member.id}
                                className="grid grid-cols-[auto_1fr_auto] gap-4 items-center"
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>
                                            {member.name.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">{member.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {member.completed}/{member.assigned} tasks completed
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium">
                                        Efficiency Rate: {member.efficiency}%
                                    </div>
                                    <Progress value={member.efficiency} />
                                    <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                                        <div>Completed: {member.completed}</div>
                                        <div>On Time: {member.onTime}</div>
                                        <div>Overdue: {member.overdue}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">
                                        {member.onTimeRate}%
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        On-time rate
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