"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    Users,
    CheckCircle2,
    Clock,
    TrendingUp,
    UserPlus
} from "lucide-react"

interface ProjectTeamOverviewProps {
    projectId: string
}

export function ProjectTeamOverview({ projectId }: ProjectTeamOverviewProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const teamMetrics = useMemo(() => {
        if (!project?.teamMembers) return null

        const tasks = mockData.tasks.filter(task => task.projectId === project.id)
        const completedTasks = tasks.filter(task => task.status === 'Done')
        const totalMembers = project.teamMembers.length
        const activeMembers = project.teamMembers.filter(member =>
            tasks.some(task => task.assigneeId === member.id)
        ).length

        const avgCompletionTime = project.metrics.averageCycleTime
        const teamUtilization = (activeMembers / totalMembers) * 100

        return {
            totalMembers,
            activeMembers,
            completedTasks: completedTasks.length,
            avgCompletionTime,
            teamUtilization
        }
    }, [project])

    if (!project || !teamMetrics) return null

    const stats = [
        {
            title: "Team Members",
            value: teamMetrics.totalMembers,
            description: `${teamMetrics.activeMembers} active members`,
            icon: Users
        },
        {
            title: "Completed Tasks",
            value: teamMetrics.completedTasks,
            description: "This sprint",
            icon: CheckCircle2
        },
        {
            title: "Avg. Completion Time",
            value: `${teamMetrics.avgCompletionTime} days`,
            description: "Per task",
            icon: Clock
        },
        {
            title: "Team Utilization",
            value: `${Math.round(teamMetrics.teamUtilization)}%`,
            description: "Current sprint",
            icon: TrendingUp
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Team</h2>
                    <p className="text-muted-foreground">
                        Manage and monitor your project team members
                    </p>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Member
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
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
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Active Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {project.teamMembers?.map((member) => {
                            const user = mockData.users.find(u => u.id === member.id)
                            if (!user) return null

                            return (
                                <div
                                    key={member.id}
                                    className="flex items-center gap-2 rounded-lg border p-2"
                                >
                                    <Avatar>
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>
                                            {user.name.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium leading-none">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {user.role}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={user.status === 'Active' ? 'default' : 'secondary'}
                                        className="ml-2"
                                    >
                                        {user.status}
                                    </Badge>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}