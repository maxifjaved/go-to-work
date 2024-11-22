"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TasksProvider } from "@/components/tasks/tasks-context"
import { TasksView } from "@/components/tasks/tasks-view"
import { TasksFilters } from "@/components/tasks/tasks-filters"
import { TasksHeader } from "@/components/tasks/tasks-header"

interface ProjectTasksProps {
    projectId: string
}

export function ProjectTasks({ projectId }: ProjectTasksProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    if (!project) return null

    // We'll wrap the tasks components with project-specific context
    return (
        <TasksProvider
            defaultFilters={{
                project: [project.id.toString()],
                status: [],
                priority: [],
                assignee: []
            }}
        >
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Tasks</CardTitle>
                            <TasksHeader hideProjectFilter />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <TasksFilters hideProjectFilter />
                            <TasksView />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TasksProvider>
    )
}