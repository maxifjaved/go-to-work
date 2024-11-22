"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { MoreHorizontal, Mail } from "lucide-react"

interface ProjectTeamProps {
    projectId: string
}

export function ProjectTeam({ projectId }: ProjectTeamProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const teamMembers = useMemo(() => {
        if (!project?.teamMembers) return []

        return project.teamMembers.map(member => {
            const tasks = mockData.tasks.filter(
                task => task.projectId === project.id && task.assigneeId === member.id
            )
            const completedTasks = tasks.filter(task => task.status === 'Done')
            const completionRate = tasks.length ? (completedTasks.length / tasks.length) * 100 : 0

            return {
                ...member,
                tasks: tasks.length,
                completedTasks: completedTasks.length,
                completionRate,
                role: mockData.users.find(u => u.id === member.id)?.role || 'Member'
            }
        })
    }, [project])

    if (!project) return null

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Team Members</CardTitle>
                        <Button>Add Member</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center justify-between space-x-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>
                                            {member.name.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium leading-none">
                                            {member.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="secondary">
                                                {member.role}
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">
                        Last active {formatDistanceToNow(new Date(member.lastActiveAt), { addSuffix: true })}
                      </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 min-w-[200px]">
                                        <div className="flex items-center justify-between text-sm mb-1">
                                            <span>{member.completedTasks}/{member.tasks} tasks</span>
                                            <span>{Math.round(member.completionRate)}%</span>
                                        </div>
                                        <Progress value={member.completionRate} />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button variant="ghost" size="icon">
                                            <Mail className="h-4 w-4" />
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                <DropdownMenuItem>Assign Tasks</DropdownMenuItem>
                                                <DropdownMenuItem>Change Role</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">
                                                    Remove from Project
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}