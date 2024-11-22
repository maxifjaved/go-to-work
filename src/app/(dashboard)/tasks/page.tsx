import {Suspense} from "react"
import {TasksView} from "@/components/tasks/tasks-view"
import {LoadingTasks} from "@/components/tasks/loading"

export default function TasksPage() {
    return (
        <div className="flex flex-col space-y-8">
            <Suspense fallback={<LoadingTasks/>}>
                <TasksView/>
            </Suspense>
        </div>
    )
}