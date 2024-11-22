import {useState} from "react"
import {useProjectsView} from "./projects-view-context"
import {ProjectCard} from "./project-card"
import {ProjectTable} from "./project-table"
import {ProjectGridSkeleton, ProjectListSkeleton} from "./project-skeletons"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {Grid, List, SlidersHorizontal} from "lucide-react"
import {mockData} from "@/components/data-table/data"
import {cn} from "@/lib/utils"

export function ProjectsList() {
    const {view, setView, sortBy, sortDirection} = useProjectsView()
    const [isLoading, setIsLoading] = useState(false)

    // Sort projects based on current sort settings
    const sortedProjects = [...mockData.projects].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return sortDirection === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name)
            case 'dueDate':
                return sortDirection === 'asc'
                    ? new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
                    : new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
            case 'status':
                return sortDirection === 'asc'
                    ? a.status.localeCompare(b.status)
                    : b.status.localeCompare(a.status)
            case 'progress':
                const progressA = (a.completedTasksCount / a.tasksCount) * 100
                const progressB = (b.completedTasksCount / b.tasksCount) * 100
                return sortDirection === 'asc'
                    ? progressA - progressB
                    : progressB - progressA
            default:
                return 0
        }
    })

    return (
        <div className="space-y-4">
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
                >
                    {view === 'grid' ? (
                        <List className="h-4 w-4"/>
                    ) : (
                        <Grid className="h-4 w-4"/>
                    )}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <SlidersHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {view === 'grid' ? (
                            <>
                                <DropdownMenuItem>Compact</DropdownMenuItem>
                                <DropdownMenuItem>Comfortable</DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem>Show Description</DropdownMenuItem>
                                <DropdownMenuItem>Show Tags</DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {isLoading ? (
                <>
                    view === 'grid' ? <ProjectGridSkeleton/> : <ProjectListSkeleton/>
                </>
            ) : (
                <div className={cn(
                    view === 'grid'
                        ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        : "space-y-4"
                )}>
                    {view === 'grid' ? (
                        sortedProjects.map((project) => (
                            <ProjectCard key={project.id} project={project}/>
                        ))
                    ) : (
                        <>
                            <ProjectTable projects={sortedProjects} />
                        </>
                    )}
                </div>
            )}
        </div>
    )
}