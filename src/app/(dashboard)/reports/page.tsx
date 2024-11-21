import { Suspense } from "react"
import { ReportsHeader } from "@/components/reports/reports-header"
import { ProjectMetrics } from "@/components/reports/project-metrics"
import { TaskCompletionChart } from "@/components/reports/task-completion-chart"
import { TeamPerformanceReport } from "@/components/reports/team-performance"
import { TimeDistributionChart } from "@/components/reports/time-distribution"
import { LoadingReports } from "@/components/reports/loading"

export default function ReportsPage() {
    return (
        <div className="flex flex-col space-y-8">
            <ReportsHeader />
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