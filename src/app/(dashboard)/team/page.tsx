import { Suspense } from "react"
import { TeamMembers } from "@/components/team/team-members"
import { TeamStats } from "@/components/team/team-stats"
import { LoadingTeam } from "@/components/team/loading"
import { TeamPerformance } from "@/components/team/team-performance"

export default function TeamPage() {
    return (
        <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Team Overview</h2>
                <p className="text-muted-foreground">
                    Manage team members and monitor team performance.
                </p>
            </div>

            <Suspense fallback={<LoadingTeam />}>
                <TeamStats />
                <TeamPerformance />
                <TeamMembers />
            </Suspense>
        </div>
    )
}