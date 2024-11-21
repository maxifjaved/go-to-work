"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts"
import {mockData} from "@/components/data-table/data";

const COLORS = ['#4ade80', '#60a5fa', '#f87171', '#fbbf24', '#a855f7']

export function TimeDistributionChart() {
    // Calculate time distribution across different task types
    const taskTypeDistribution = mockData.tasks.reduce((acc, task) => {
        const type = task.type
        acc[type] = (acc[type] || 0) + task.estimatedHours
        return acc
    }, {} as Record<string, number>)

    const data = Object.entries(taskTypeDistribution).map(([name, value]) => ({
        name,
        value,
    }))

    // Calculate total hours
    const totalHours = data.reduce((sum, item) => sum + item.value, 0)

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Time Distribution by Task Type</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({
                                            cx,
                                            cy,
                                            midAngle,
                                            innerRadius,
                                            outerRadius,
                                            value,
                                            name,
                                        }) => {
                                    const RADIAN = Math.PI / 180
                                    const radius = 25 + innerRadius + (outerRadius - innerRadius)
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN)
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN)

                                    return (
                                        <text
                                            x={x}
                                            y={y}
                                            fill="#888888"
                                            textAnchor={x > cx ? "start" : "end"}
                                            dominantBaseline="central"
                                        >
                                            {`${name} (${Math.round((value / totalHours) * 100)}%)`}
                                        </text>
                                    )
                                }}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => `${value} hours`}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <div>{item.name}: {item.value} hours</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}