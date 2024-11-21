"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts"
import {mockData} from "@/components/data-table/data";

export function TeamPerformance() {
    // Calculate performance metrics
    const memberPerformance = mockData.users.map(user => {
        const tasks = mockData.tasks.filter(task => task.assigneeId === user.id)
        const completedTasks = tasks.filter(task => task.status === 'Done')
        const overdueTasks = tasks.filter(
            task => new Date(task.dueDate) < new Date() && task.status !== 'Done'
        )

        return {
            name: user.name,
            completed: completedTasks.length,
            inProgress: tasks.filter(task => task.status === 'In Progress').length,
            overdue: overdueTasks.length
        }
    })

    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={memberPerformance}>
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
            </CardContent>
        </Card>
    )
}