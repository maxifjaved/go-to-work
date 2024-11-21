"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import {eachDayOfInterval, format, subDays} from "date-fns"
import {mockData} from "@/components/data-table/data";

export function TaskCompletionChart() {
    // Generate last 30 days of data
    const data = eachDayOfInterval({
        start: subDays(new Date(), 30),
        end: new Date(),
    }).map(date => {
        const dayTasks = mockData.tasks.filter(task => {
            const completedDate = new Date(task.completedAt || '')
            return (
                task.status === 'Done' &&
                completedDate.getDate() === date.getDate() &&
                completedDate.getMonth() === date.getMonth()
            )
        })

        return {
            date: format(date, 'MMM dd'),
            completed: dayTasks.length,
            total: mockData.tasks.filter(task =>
                new Date(task.createdAt).getDate() === date.getDate()
            ).length,
        }
    })

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Task Completion Trend</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis
                                dataKey="date"
                                tickFormatter={(value) => format(new Date(value), 'dd')}
                            />
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line
                                type="monotone"
                                dataKey="completed"
                                stroke="#4ade80"
                                name="Completed Tasks"
                            />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#94a3b8"
                                name="Total Tasks"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}