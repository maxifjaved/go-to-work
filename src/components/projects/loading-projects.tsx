import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingProjects() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-[150px]" />
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                            <Skeleton className="h-6 w-[80px]" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[80%]" />
                        </div>
                        <div className="mt-4 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-4 w-[50px]" />
                                </div>
                                <Skeleton className="h-2 w-full" />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex -space-x-2">
                                    {Array.from({ length: 4 }).map((_, j) => (
                                        <Skeleton key={j} className="h-8 w-8 rounded-full" />
                                    ))}
                                </div>
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <div className="flex justify-between w-full">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}