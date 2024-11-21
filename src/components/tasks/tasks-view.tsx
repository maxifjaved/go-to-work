"use client"

import { useTasks } from "./tasks-context"
import { TasksBoard } from "./tasks-board"
import { TasksList } from "./tasks-list"
import { TasksBulkActions } from "./tasks-bulk-actions"

export function TasksView() {
    const { view } = useTasks()

    return (
        <>
            {view === "board" ? <TasksBoard /> : <TasksList />}
            <TasksBulkActions />
        </>
    )
}