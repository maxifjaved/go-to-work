"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import {
    MoreHorizontal,
    MessageSquare,
    Paperclip,
    Calendar,
    AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {Task} from "@/components/data-table/columns";
import {mockData} from "@/components/data-table/data";

interface TaskCardProps {
    task: Task
}

const priorityColors = {
    'Low': 'bg-slate-100 text-slate-700',
    'Medium': 'bg-blue-100 text-blue-700',
    'High': 'bg-orange-100 text-orange-700',
    'Urgent': 'bg-red-100 text-red-700',
}

export function TaskCard({ task }: TaskCardProps) {
    const assignee = mockData.users.find(user => user.id === task.assigneeId)
    const project = mockData.projects.find(project => project.id === task.projectId)
    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Done'

    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between space-x-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.key}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                            <DropdownMenuItem>Add Comment</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                Delete Task
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary" className={cn(
                        priorityColors[task.priority as keyof typeof priorityColors]
                    )}>
                        {task.priority}
                    </Badge>
                    {project && (
                        <Badge variant="outline">
                            {project.name}
                        </Badge>
                    )}
                </div>
                {isOverdue && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mb-2">
                        <AlertCircle className="h-3 w-3" />
                        Overdue
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                        {assignee && (
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={assignee.avatar} />
                                <AvatarFallback>
                                    {assignee.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        )}
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                <span className="text-xs">{task.commentsCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Paperclip className="h-3 w-3" />
                                <span className="text-xs">{task.attachmentsCount}</span>
                            </div>
                            {task.dueDate && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span className="text-xs">
                    {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
                  </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}