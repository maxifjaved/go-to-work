import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function LoadingTeam() {
    return (
        <div className="space-y-8">
            <LoadingTeamStats />
            <LoadingTeamMembers />
        </div>
    )
}

export function LoadingTeamStats() {
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

export function LoadingTeamMembers() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <CardHeader className="p-4">
                        <div className="flex items-start justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div>
                                    <Skeleton className="h-5 w-[150px] mb-2" />
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="h-4 w-[100px]" />
                                        <Skeleton className="h-4 w-[80px]" />
                                    </div>
                                </div>
                            </div>
                            <Skeleton className="h-8 w-8" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="grid gap-4">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-4 w-[80px]" />
                                </div>
                                <Skeleton className="h-2 w-full" />
                            </div>
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-[120px]" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-[60px]" />
                                <Skeleton className="h-6 w-[70px]" />
                                <Skeleton className="h-6 w-[65px]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}