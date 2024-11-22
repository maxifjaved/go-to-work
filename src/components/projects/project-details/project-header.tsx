'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProjectActionsMenu } from "./project-actions-menu"
import { Share2, Plus, Users } from "lucide-react"
import { mockData } from "@/components/data-table/data"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProjectHeaderProps {
    projectId: string
}

export function ProjectHeader({ projectId }: ProjectHeaderProps) {
    const router = useRouter()
    const project = mockData.projects.find(p => p.id.toString() === projectId)

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
                        <Link key={member.id} href={`/team/${member.id}`}>
                            <Avatar className="border-2 border-background cursor-pointer hover:border-primary">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>
                                    {member.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    ))}
                    {(project.teamMembers?.length ?? 0) > 4 && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => router.push(`/projects/${projectId}/team`)}
                        >
                            <Avatar className="border-2 border-background hover:border-primary">
                                <AvatarFallback>
                                    +{(project.teamMembers?.length ?? 0) - 4}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    )}
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push(`/projects/${projectId}/team`)}>
                    <Users className="mr-2 h-4 w-4" />
                    Manage Team
                </Button>
                <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                </Button>
                <Button onClick={() => router.push(`/projects/${projectId}/tasks/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                </Button>
                <ProjectActionsMenu projectId={projectId} />
            </div>
        </div>
    )
}