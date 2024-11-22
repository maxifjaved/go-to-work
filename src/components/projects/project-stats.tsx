import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockData } from "@/components/data-table/data"
import { BarChart2, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProjectStats() {
    const totalProjects = mockData.projects.length
    const activeProjects = mockData.projects.filter(p => p.status === 'Active').length
    const completedProjects = mockData.projects.filter(p => p.status === 'Completed').length
    const onHoldProjects = mockData.projects.filter(p => p.status === 'On Hold').length

    const stats = [
        {
            title: "Total Projects",
            value: totalProjects,
            description: "Across all departments",
            icon: BarChart2,
            trend: "+12.5% from last month",
            trendUp: true
        },
        {
            title: "Active Projects",
            value: activeProjects,
            description: "Currently in progress",
            icon: Clock,
            trend: "+4.5% from last month",
            trendUp: true
        },
        {
            title: "Completed Projects",
            value: completedProjects,
            description: "Successfully delivered",
            icon: CheckCircle,
            trend: "+8.2% from last month",
            trendUp: true
        },
        {
            title: "On Hold Projects",
            value: onHoldProjects,
            description: "Temporarily paused",
            icon: AlertTriangle,
            trend: "-2.5% from last month",
            trendUp: false
        }
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                        <p className={cn(
                            "text-xs mt-2",
                            stat.trendUp ? "text-green-600" : "text-red-600"
                        )}>
                            {stat.trend}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}