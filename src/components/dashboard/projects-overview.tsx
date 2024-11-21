"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { cn } from "@/lib/utils"
import {mockData} from "@/components/data-table/data";

interface ProjectsOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}

export function ProjectsOverview({ className, ...props }: ProjectsOverviewProps) {
    // Calculate project statistics
    const projectStats = mockData.projects.reduce((acc, project) => {
        acc[project.status] = (acc[project.status] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const chartData = Object.entries(projectStats).map(([status, count]) => ({
        name: status,
        value: count
    }))

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

    return (
        <Card className={cn(className)} {...props}>
            <CardHeader>
                <CardTitle>Projects Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}