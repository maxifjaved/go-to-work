import { Suspense } from "react"
import { DashboardMetrics } from "@/components/dashboard/metrics-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ProjectsOverview } from "@/components/dashboard/projects-overview"
import { TeamOverview } from "@/components/dashboard/team-overview"
import { TasksOverview } from "@/components/dashboard/tasks-overview"
import {
    LoadingCards,
    LoadingChart,
    LoadingActivity,
    LoadingTeam
} from "@/components/dashboard/loading-cards"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <Suspense fallback={<LoadingCards />}>
                <DashboardMetrics />
            </Suspense>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Suspense fallback={<LoadingChart />}>
                    <TasksOverview className="col-span-4" />
                </Suspense>
                <Suspense fallback={<LoadingChart />}>
                    <ProjectsOverview className="col-span-3" />
                </Suspense>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Suspense fallback={<LoadingActivity />}>
                    <RecentActivity className="col-span-4" />
                </Suspense>
                <Suspense fallback={<LoadingTeam />}>
                    <TeamOverview className="col-span-3" />
                </Suspense>
            </div>
        </div>
    )
}