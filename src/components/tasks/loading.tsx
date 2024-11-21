import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function LoadingTasks() {
    return (
        <div className="space-y-4">
            <LoadingTasksList />
        </div>
    )
}

export function LoadingTasksBoard() {
    return (
        <div className="flex gap-4 overflow-x-auto pb-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-80">
                    <Card>
                        <CardHeader className="p-4">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-5 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-2">
                            <div className="space-y-2">
                                {Array.from({ length: 3 }).map((_, j) => (
                                    <Card key={j}>
                                        <CardHeader className="p-3">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-3 w-24" />
                                        </CardHeader>
                                        <CardContent className="p-3">
                                            <div className="flex justify-between items-center">
                                                <Skeleton className="h-6 w-6 rounded-full" />
                                                <Skeleton className="h-3 w-20" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export function LoadingTasksList() {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40px]">
                            <Skeleton className="h-4 w-4" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="text-right">
                            <Skeleton className="h-4 w-8 ml-auto" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Skeleton className="h-4 w-4" />
                            </TableCell>
                            <TableCell>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-48" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-16" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-16" />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-24" />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-2 w-16" />
                                    <Skeleton className="h-4 w-8" />
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Skeleton className="h-8 w-8 ml-auto" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}