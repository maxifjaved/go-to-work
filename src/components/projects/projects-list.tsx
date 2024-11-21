"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {mockData} from "@/components/data-table/data";

export function ProjectsList() {
    const projects = mockData.projects

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
                <Card key={project.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">{project.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {project.key} · {project.department}
                                </p>
                            </div>
                            <Badge
                                variant={
                                    project.status === 'default'
                                        ? 'default'
                                        : project.status === 'Completed'
                                            ? 'secondary'
                                            : 'destructive'
                                }
                            >
                                {project.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {project.description}
                        </p>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Progress</span>
                                    <span className="text-muted-foreground">
                    {Math.round((project.completedTasksCount / project.tasksCount) * 100)}%
                  </span>
                                </div>
                                <Progress
                                    value={(project.completedTasksCount / project.tasksCount) * 100}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <TooltipProvider>
                                        {project.teamMembers?.slice(0, 4).map(member => (
                                            <Tooltip key={member.id}>
                                                <TooltipTrigger asChild>
                                                    <Avatar className="h-8 w-8 border-2 border-background">
                                                        <AvatarImage src={member.avatar} />
                                                        <AvatarFallback>
                                                            {member.name.slice(0, 2).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </TooltipTrigger>
                                                <TooltipContent>{member.name}</TooltipContent>
                                            </Tooltip>
                                        ))}
                                        {(project.teamMembers?.length ?? 0) > 4 && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Avatar className="h-8 w-8 border-2 border-background">
                                                        <AvatarFallback>
                                                            +{(project.teamMembers?.length ?? 0) - 4}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {(project.teamMembers?.length ?? 0) - 4} more team members
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                    </TooltipProvider>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {formatDistanceToNow(new Date(project.startDate), { addSuffix: true })}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <div className="flex justify-between w-full text-sm text-muted-foreground">
                            <div>Tasks: {project.completedTasksCount}/{project.tasksCount}</div>
                            <div>Budget: ${project.budget.spent.toLocaleString()}</div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}