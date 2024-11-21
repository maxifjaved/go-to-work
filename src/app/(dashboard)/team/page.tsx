import { Suspense } from "react"
import { TeamHeader } from "@/components/team/team-header"
import { TeamMembers } from "@/components/team/team-members"
import { TeamStats } from "@/components/team/team-stats"
import { LoadingTeam } from "@/components/team/loading"
import {TeamPerformance} from "@/components/team/team-performance";

export default function TeamPage() {
    return (
        <div className="flex flex-col space-y-8">
            <TeamHeader/>
            <Suspense fallback={<LoadingTeam/>}>
                <TeamStats/>
                <TeamPerformance/>
                <TeamMembers/>
            </Suspense>
        </div>
    )
}