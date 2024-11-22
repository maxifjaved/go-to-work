"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Share2 } from "lucide-react"
import { mockData } from "@/components/data-table/data"
import { useMemo } from "react"

interface ProjectHeaderProps {
    projectId: string
}

export function ProjectHeader({ projectId }: ProjectHeaderProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    if (!project) return null

    const progress = Math.round((project.completedTasksCount / project.tasksCount) * 100)

    return (
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
                <div className="flex items-center gap-4">
                    <Badge variant="outline">{project.key}</Badge>
                    <Badge
                        variant={project.status === 'Active' ? 'default' : 'secondary'}
                    >
                        {project.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
            {progress}% completed
          </span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                    {project.teamMembers?.slice(0, 4).map((member) => (
                        <Avatar key={member.id} className="border-2 border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>
                                {member.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    ))}
                    {(project.teamMembers?.length ?? 0) > 4 && (
                        <Avatar className="border-2 border-background">
                            <AvatarFallback>
                                +{(project.teamMembers?.length ?? 0) - 4}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
                <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuItem>Add Member</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            Archive Project
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}