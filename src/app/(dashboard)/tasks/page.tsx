import { Suspense } from "react"
import { TasksHeader } from "@/components/tasks/tasks-header"
import { TasksView } from "@/components/tasks/tasks-view"
import { TasksFilters } from "@/components/tasks/tasks-filters"
import { LoadingTasks } from "@/components/tasks/loading"
import { TasksProvider } from "@/components/tasks/tasks-context"

export default function TasksPage() {
    return (
        <TasksProvider>
            <div className="flex flex-col space-y-8">
                <TasksHeader />
                <TasksFilters />
                <Suspense fallback={<LoadingTasks />}>
                    <TasksView />
                </Suspense>
            </div>
        </TasksProvider>
    )
}