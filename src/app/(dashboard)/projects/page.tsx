"use client"
import { Suspense } from "react"
import { ProjectsHeader } from "@/components/projects/projects-header"
import { ProjectsFilters } from "@/components/projects/projects-filters"
import { ProjectsList } from "@/components/projects/projects-list"
import { ProjectsListView } from "@/components/projects/projects-list-view"
import { LoadingProjects } from "@/components/projects/loading-projects"
import { ProjectsViewProvider } from "@/components/projects/projects-view-context"
import { ProjectStats } from "@/components/projects/project-stats"
import { ProjectQuickFilters } from "@/components/projects/project-quick-filters"
import { ProjectDepartmentSummary } from "@/components/projects/project-department-summary"
import { ProjectOverdueAlert } from "@/components/projects/project-overdue-alert"
import { ProjectEmpty } from "@/components/projects/project-empty"
import { useProjectsView } from "@/components/projects/projects-view-context"
import { mockData } from "@/components/data-table/data"

export default function ProjectsPage() {
    return (
        <ProjectsViewProvider>
            <div className="space-y-8">
                <ProjectsHeader />

                <Suspense fallback={<LoadingProjects />}>
                    <ProjectOverdueAlert />

                    <ProjectStats />

                    <div className="space-y-4">
                        <ProjectQuickFilters />
                        <ProjectsFilters />
                    </div>

                    {mockData.projects.length > 0 ? (
                        <div className="grid gap-6">
                            <ProjectsList />
                            <ProjectDepartmentSummary />
                        </div>
                    ) : (
                        <>
                        <ProjectEmpty />
                        </>
                    )}
                </Suspense>
            </div>
        </ProjectsViewProvider>
    )
}