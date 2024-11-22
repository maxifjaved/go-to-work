import { Suspense } from "react"
import {
    ProjectTeamOverview,
    ProjectTeamMembers,
    ProjectTeamPerformance
} from "@/components/projects/project-details/team"
import { LoadingTeam } from "@/components/team/loading"

interface ProjectTeamPageProps {
    params: {
        id: string
    }
}

export default function ProjectTeamPage({ params }: ProjectTeamPageProps) {
    return (
        <div className="space-y-8">
            <Suspense fallback={<LoadingTeam />}>
                <ProjectTeamOverview projectId={params.id} />
                <ProjectTeamPerformance projectId={params.id} />
                <ProjectTeamMembers projectId={params.id} />
            </Suspense>
        </div>
    )
}