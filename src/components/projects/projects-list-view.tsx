"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatDistanceToNow } from "date-fns"
import { useProjectsView } from "./projects-view-context"
import {
    ArrowUpDown,
    MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Project} from "@/components/data-table/columns";
import {mockData} from "@/components/data-table/data";

function getSortedProjects(projects: Project[], sortBy: string, direction: 'asc' | 'desc') {
    return [...projects].sort((a, b) => {
        let comparison = 0
        switch (sortBy) {
            case 'name':
                comparison = a.name.localeCompare(b.name)
                break
            case 'created':
                comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                break
            case 'status':
                comparison = a.status.localeCompare(b.status)
                break
            case 'progress':
                const progressA = (a.completedTasksCount / a.tasksCount) * 100
                const progressB = (b.completedTasksCount / b.tasksCount) * 100
                comparison = progressA - progressB
                break
            default:
                comparison = 0
        }
        return direction === 'asc' ? comparison : -comparison
    })
}

export function ProjectsListView() {
    const { sortBy, setSortBy, sortDirection, setSortDirection } = useProjectsView()
    const projects = getSortedProjects(mockData.projects, sortBy, sortDirection)

    const toggleSort = (key: typeof sortBy) => {
        if (sortBy === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(key)
            setSortDirection('asc')
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">
                            <Button
                                variant="ghost"
                                onClick={() => toggleSort('name')}
                            >
                                Project
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button
                                variant="ghost"
                                onClick={() => toggleSort('status')}
                            >
                                Status
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button
                                variant="ghost"
                                onClick={() => toggleSort('progress')}
                            >
                                Progress
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>
                            <Button
                                variant="ghost"
                                onClick={() => toggleSort('created')}
                            >
                                Created
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>
                                <div>
                                    <div className="font-medium">{project.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {project.key} · {project.department}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        project.status === 'Active'
                                            ? 'default'
                                            : project.status === 'Completed'
                                                ? 'secondary'
                                                : 'secondary'
                                    }
                                >
                                    {project.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Progress
                                            value={(project.completedTasksCount / project.tasksCount) * 100}
                                            className="w-[60px]"
                                        />
                                        <span className="text-sm text-muted-foreground">
                      {Math.round(
                          (project.completedTasksCount / project.tasksCount) * 100
                      )}%
                    </span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex -space-x-2">
                                    <TooltipProvider>
                                        {project.teamMembers?.slice(0, 3).map((member) => (
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
                                        {(project.teamMembers?.length ?? 0) > 3 && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Avatar className="h-8 w-8 border-2 border-background">
                                                        <AvatarFallback>
                                                            +{(project.teamMembers?.length ?? 0) - 3}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {(project.teamMembers?.length ?? 0) - 3} more team members
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                    </TooltipProvider>
                                </div>
                            </TableCell>
                            <TableCell>
                                {formatDistanceToNow(new Date(project.createdAt), {
                                    addSuffix: true,
                                })}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View project</DropdownMenuItem>
                                        <DropdownMenuItem>View tasks</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Edit project</DropdownMenuItem>
                                        <DropdownMenuItem>Archive project</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}