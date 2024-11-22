import { Suspense } from "react"
import {
    ProjectHeader,
    ProjectOverview,
    ProjectTasks,
    ProjectTeam,
    ProjectActivity,
    ProjectFiles
} from "@/components/projects/project-details"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoadingOverview, { LoadingTasks } from "./loading"

interface ProjectPageProps {
    params: {
        id: string
    }
}

export default function ProjectPage({ params }: ProjectPageProps) {
    return (
        <div className="space-y-6">
            <ProjectHeader projectId={params.id} />

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <Suspense fallback={<LoadingOverview />}>
                        <ProjectOverview projectId={params.id} />
                    </Suspense>
                </TabsContent>

                <TabsContent value="tasks">
                    <Suspense fallback={<LoadingTasks />}>
                        <ProjectTasks projectId={params.id} />
                    </Suspense>
                </TabsContent>

                <TabsContent value="team">
                    <Suspense fallback={<LoadingTasks />}>
                        <ProjectTeam projectId={params.id} />
                    </Suspense>
                </TabsContent>

                <TabsContent value="files">
                    <ProjectFiles projectId={params.id} />
                </TabsContent>

                <TabsContent value="activity">
                    <ProjectActivity projectId={params.id} />
                </TabsContent>
            </Tabs>
        </div>
    )
}