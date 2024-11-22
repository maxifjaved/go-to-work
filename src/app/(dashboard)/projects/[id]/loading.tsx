import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoadingOverview() {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-[60px] mb-2" />
                            <Skeleton className="h-2 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-[120px]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px]" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-[120px]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px]" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export function LoadingTasks() {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-4 w-4" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-full" />
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-3 w-[100px]" />
                                    <Skeleton className="h-3 w-[60px]" />
                                </div>
                            </div>
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}