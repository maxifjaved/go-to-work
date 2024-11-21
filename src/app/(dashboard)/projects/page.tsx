import { Suspense } from "react"
import { ProjectsHeader } from "@/components/projects/projects-header"
import { ProjectsList } from "@/components/projects/projects-list"
import { ProjectsFilters } from "@/components/projects/projects-filters"
import { LoadingProjects } from "@/components/projects/loading-projects"
import { ProjectsViewProvider } from "@/components/projects/projects-view-context"

export default function ProjectsPage() {
    return (
        <ProjectsViewProvider>
            <div className="flex flex-col space-y-8">
                <ProjectsHeader />
                <ProjectsFilters />
                <Suspense fallback={<LoadingProjects />}>
                    <ProjectsList />
                </Suspense>
            </div>
        </ProjectsViewProvider>
    )
}