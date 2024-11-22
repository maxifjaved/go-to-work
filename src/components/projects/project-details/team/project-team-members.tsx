"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Mail } from "lucide-react"

interface ProjectTeamMembersProps {
    projectId: string
}

export function ProjectTeamMembers({ projectId }: ProjectTeamMembersProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const teamMembers = useMemo(() => {
        if (!project?.teamMembers) return []

        return project.teamMembers.map(member => {
            const user = mockData.users.find(u => u.id === member.id)
            const tasks = mockData.tasks.filter(
                task => task.projectId === project.id && task.assigneeId === member.id
            )
            const completedTasks = tasks.filter(task => task.status === 'Done')
            const inProgressTasks = tasks.filter(task => task.status === 'In Progress')

            const taskMetrics = project.metrics.memberPerformance[member.id] || {
                assignedTasks: 0,
                completedTasks: 0,
                averageCompletionTime: 0
            }

            return {
                ...member,
                user,
                tasks: tasks.length,
                completedTasks: completedTasks.length,
                inProgressTasks: inProgressTasks.length,
                metrics: taskMetrics,
                joinedAt: member.joinedAt,
                role: member.role,
                permission: 'editor' // This would come from project permissions
            }
        })
    }, [project])

    if (!project || teamMembers.length === 0) return null

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Team Members</h3>
                <Button variant="outline">Manage Team</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                    <Card key={member.id} className="relative overflow-hidden">
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={member.user?.avatar} />
                                        <AvatarFallback>
                                            {member.user?.name.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-base">{member.user?.name}</CardTitle>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="outline">{member.role}</Badge>
                                            <Badge>{member.permission}</Badge>
                                        </div>
                                    </div>
                                </div>
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
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="text-sm">Task Progress</div>
                                    <Progress
                                        value={(member.completedTasks / (member.tasks || 1)) * 100}
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>{member.completedTasks}/{member.tasks} completed</span>
                                        <span>{member.inProgressTasks} in progress</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-muted-foreground">Avg. Completion</div>
                                        <div className="font-medium">
                                            {member.metrics.averageCompletionTime} days
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground">Member Since</div>
                                        <div className="font-medium">
                                            {new Date(member.joinedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Mail className="mr-2 h-4 w-4" />
                                        Message
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}