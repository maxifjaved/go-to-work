import { Suspense } from "react"
import { ProjectMetrics } from "@/components/reports/project-metrics"
import { TaskCompletionChart } from "@/components/reports/task-completion-chart"
import { TeamPerformanceReport } from "@/components/reports/team-performance"
import { TimeDistributionChart } from "@/components/reports/time-distribution"
import { LoadingReports } from "@/components/reports/loading"

export default function ReportsPage() {
    return (
        <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Reports Overview</h2>
                <p className="text-muted-foreground">
                    View key metrics and performance indicators across all projects and teams.
                </p>
            </div>

            <Suspense fallback={<LoadingReports />}>
                <div className="grid gap-6">
                    <ProjectMetrics />
                    <div className="grid gap-6 md:grid-cols-2">
                        <TaskCompletionChart />
                        <TimeDistributionChart />
                    </div>
                    <TeamPerformanceReport />
                </div>
            </Suspense>
        </div>
    )
}