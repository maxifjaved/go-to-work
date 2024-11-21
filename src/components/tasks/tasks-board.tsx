"use client"

import { useCallback } from "react"
import { TaskCard } from "./task-card"
import { useTasks } from "./tasks-context"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Status, Task} from "@/components/data-table/columns";
import {mockData} from "@/components/data-table/data";

const statusColors = {
    'Backlog': 'bg-slate-100',
    'Todo': 'bg-blue-100',
    'In Progress': 'bg-yellow-100',
    'In Review': 'bg-purple-100',
    'Done': 'bg-green-100',
    'Archived': 'bg-gray-100',
} as const

export function TasksBoard() {
    const { filters, searchQuery, sortBy, sortDirection, groupBy } = useTasks()

    // Filter and sort tasks
    const filterTasks = useCallback((tasks: Task[]) => {
        return tasks.filter(task => {
            // Apply search
            if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false
            }

            // Apply filters
            if (filters.status.length && !filters.status.includes(task.status)) {
                return false
            }
            if (filters.priority.length && !filters.priority.includes(task.priority)) {
                return false
            }
            if (filters.assignee.length && !filters.assignee.includes(task.assigneeId.toString())) {
                return false
            }
            if (filters.project.length && !filters.project.includes(task.projectId.toString())) {
                return false
            }

            return true
        })
    }, [filters, searchQuery])

    // Group tasks by status
    const getGroupedTasks = useCallback(() => {
        const filteredTasks = filterTasks(mockData.tasks)

        if (groupBy === "status") {
            const columns: Record<Status, Task[]> = {
                'Backlog': [],
                'Todo': [],
                'In Progress': [],
                'In Review': [],
                'Done': [],
                'Archived': [],
            }

            filteredTasks.forEach(task => {
                columns[task.status].push(task)
            })

            // Sort tasks within each column
            Object.values(columns).forEach(tasks => {
                tasks.sort((a, b) => {
                    let comparison = 0
                    switch (sortBy) {
                        case "priority":
                            comparison = a.priorityOrder - b.priorityOrder
                            break
                        case "dueDate":
                            comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                            break
                        default:
                            comparison = 0
                    }
                    return sortDirection === "asc" ? comparison : -comparison
                })
            })

            return columns
        }

        return {} as Record<Status, Task[]>
    }, [filterTasks, groupBy, sortBy, sortDirection])

    const columns = getGroupedTasks()

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result

        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        // Here you would update the task status in your actual data
        console.log('Move task', draggableId, 'from', source.droppableId, 'to', destination.droppableId)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-4">
                {Object.entries(columns).map(([status, tasks]) => (
                    <div key={status} className="flex-shrink-0 w-80">
                        <Card>
                            <CardHeader className="p-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium">
                                        {status}
                                    </CardTitle>
                                    <Badge variant="secondary">
                                        {tasks.length}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-2">
                                <Droppable droppableId={status}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={cn(
                                                "h-full min-h-[500px] rounded-md p-2",
                                                snapshot.isDraggingOver && "bg-accent",
                                                statusColors[status as Status]
                                            )}
                                        >
                                            {tasks.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={cn(
                                                                "mb-2",
                                                                snapshot.isDragging && "opacity-50"
                                                            )}
                                                        >
                                                            <TaskCard task={task} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </DragDropContext>
    )
}