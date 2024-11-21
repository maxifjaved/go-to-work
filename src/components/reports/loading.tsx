import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function LoadingReports() {
    return (
        <div className="space-y-6">
            <LoadingMetrics />
            <div className="grid gap-6 md:grid-cols-2">
                <LoadingChart />
                <LoadingChart />
            </div>
            <LoadingTeamPerformance />
        </div>
    )
}

function LoadingMetrics() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-[60px] mb-2" />
                        <Skeleton className="h-3 w-[100px]" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

function LoadingChart() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-[200px]" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[350px]" />
            </CardContent>
        </Card>
    )
}

function LoadingTeamPerformance() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-[250px]" />
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <Skeleton className="h-[400px]" />
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-2 w-full" />
                                <div className="grid grid-cols-3 gap-4">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-4 w-[100px]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}