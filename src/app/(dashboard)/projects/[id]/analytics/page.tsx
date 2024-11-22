import { Suspense } from "react"
import {
    ProjectMetricsOverview,
    ProjectVelocityChart,
    ProjectBurndownChart,
    ProjectTaskDistribution,
    ProjectTimeDistribution,
    ProjectMemberPerformance,
    ProjectTrendAnalysis,
    AnalyticsProvider,
    AnalyticsFilters
} from "@/components/projects/project-details/analytics"
import { LoadingReports } from "@/components/reports/loading"

interface ProjectAnalyticsPageProps {
    params: {
        id: string
    }
}

export default function ProjectAnalyticsPage({ params }: ProjectAnalyticsPageProps) {
    return (
        <AnalyticsProvider>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
                        <p className="text-muted-foreground">
                            Track and analyze project performance metrics
                        </p>
                    </div>
                </div>

                <AnalyticsFilters />

                <Suspense fallback={<LoadingReports />}>
                    <ProjectMetricsOverview projectId={params.id} />

                    <ProjectTrendAnalysis projectId={params.id} />

                    <div className="grid gap-6 md:grid-cols-2">
                        <ProjectVelocityChart projectId={params.id} />
                        <ProjectBurndownChart projectId={params.id} />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <ProjectTaskDistribution projectId={params.id} />
                        <ProjectTimeDistribution projectId={params.id} />
                    </div>

                    <ProjectMemberPerformance projectId={params.id} />
                </Suspense>
            </div>
        </AnalyticsProvider>
    )
}