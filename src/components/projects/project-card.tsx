import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    MoreHorizontal,
    Star,
    Edit,
    Copy,
    Archive,
    Trash,
    Clock,
    Users,
    CheckCircle2
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Project } from "@/components/data-table/columns"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const router = useRouter()
    const progress = Math.round((project.completedTasksCount / project.tasksCount) * 100)
    const dueDate = new Date(project.endDate)
    const isOverdue = dueDate < new Date() && project.status !== 'Completed'

    return (
        <Card className="group relative hover:shadow-md transition-shadow">
            <CardHeader className="p-4">
                <div className="flex items-start justify-between space-x-4">
                    <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                            >
                                <Star className="h-4 w-4" />
                            </Button>
                            <h3
                                className="font-semibold hover:underline cursor-pointer"
                                onClick={() => router.push(`/projects/${project.id}`)}
                            >
                                {project.name}
                            </h3>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push(`/projects/${project.id}/edit`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                    <Badge
                        variant={project.status === 'Active' ? 'default' : 'secondary'}
                        className={cn(
                            project.status === 'Completed' && "bg-green-500",
                            project.status === 'On Hold' && "bg-yellow-500"
                        )}
                    >
                        {project.status}
                    </Badge>
                    <Badge variant="outline">{project.department}</Badge>
                    {isOverdue && (
                        <Badge variant="destructive">Overdue</Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span className="text-muted-foreground">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>
                                Due {formatDistanceToNow(dueDate, { addSuffix: true })}
                            </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <CheckCircle2 className="mr-1 h-4 w-4" />
                            <span>
                                {project.completedTasksCount}/{project.tasksCount} tasks
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between w-full">
                    <div className="flex -space-x-2">
                        {project.teamMembers?.slice(0, 3).map((member) => (
                            <Avatar
                                key={member.id}
                                className="border-2 border-background h-8 w-8 hover:translate-y-[-2px] transition-transform cursor-pointer"
                                onClick={() => router.push(`/team/${member.id}`)}
                            >
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>
                                    {member.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                        {(project.teamMembers?.length ?? 0) > 3 && (
                            <Avatar className="border-2 border-background h-8 w-8">
                                <AvatarFallback>
                                    +{(project.teamMembers?.length ?? 0) - 3}
                                </AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => router.push(`/projects/${project.id}/team`)}
                    >
                        <Users className="h-4 w-4" />
                        Team
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}