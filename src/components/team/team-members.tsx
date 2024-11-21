"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns"
import { MoreHorizontal, Mail, PhoneCall, MapPin } from "lucide-react"
import {mockData} from "@/components/data-table/data";

export function TeamMembers() {
    const members = mockData.users.map(user => {
        const userTasks = mockData.tasks.filter(task => task.assigneeId === user.id)
        const completedTasks = userTasks.filter(task => task.status === 'Done')
        const taskCompletion = userTasks.length
            ? (completedTasks.length / userTasks.length) * 100
            : 0

        return {
            ...user,
            taskCompletion,
            tasksCount: userTasks.length,
            completedTasksCount: completedTasks.length,
            projects: new Set(userTasks.map(task => task.projectId)).size
        }
    })

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                        <div className="flex items-start justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>
                                        {member.name.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base">
                                        {member.name}
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {member.title}
                    </span>
                                        <Badge variant="secondary" className="text-xs">
                                            {member.department}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Assign Tasks</DropdownMenuItem>
                                    <DropdownMenuItem>View Projects</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                        Remove Member
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="grid gap-4">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Mail className="h-4 w-4" />
                                    {member.email}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <PhoneCall className="h-4 w-4" />
                                    {member.title}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {member.timeZone}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Task Completion</span>
                                    <span className="text-muted-foreground">
                    {member.completedTasksCount}/{member.tasksCount} tasks
                  </span>
                                </div>
                                <Progress value={member.taskCompletion} />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div>Active Projects: {member.projects}</div>
                                <div className="text-muted-foreground">
                                    Last active {formatDistanceToNow(new Date(member.lastActive), { addSuffix: true })}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {member.skills.slice(0, 3).map((skill, index) => (
                                    <Badge key={index} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                                {member.skills.length > 3 && (
                                    <Badge variant="secondary">
                                        +{member.skills.length - 3} more
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}