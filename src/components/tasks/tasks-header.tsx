"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Kanban,
    List,
    Plus,
    SlidersHorizontal,
    GroupIcon,
} from "lucide-react"
import { useTasks } from "./tasks-context"
import { NewTaskDialog } from "./new-task-dialog"

interface TasksHeaderProps {
    hideProjectFilter?: boolean
}

export function TasksHeader({ hideProjectFilter }: TasksHeaderProps) {
    const {
        view,
        setView,
        groupBy,
        setGroupBy,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
    } = useTasks()

    const groupByOptions = [
        { value: 'status', label: 'Status' },
        { value: 'priority', label: 'Priority' },
        { value: 'assignee', label: 'Assignee' },
        ...(hideProjectFilter ? [] : [{ value: 'project', label: 'Project' }]),
    ]

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => setView(view === "board" ? "list" : "board")}
            >
                {view === "board" ? (
                    <List className="h-4 w-4" />
                ) : (
                    <Kanban className="h-4 w-4" />
                )}
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <GroupIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Group By</DropdownMenuLabel>
                    {groupByOptions.map(option => (
                        <DropdownMenuItem
                            key={option.value}
                            onClick={() => setGroupBy(option.value as any)}
                        >
                            {option.label} {groupBy === option.value && "✓"}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setSortBy("priority")}>
                        Priority {sortBy === "priority" && (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("dueDate")}>
                        Due Date {sortBy === "dueDate" && (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("status")}>
                        Status {sortBy === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSortDirection(
                        sortDirection === "asc" ? "desc" : "asc"
                    )}>
                        {sortDirection === "asc" ? "Sort Descending" : "Sort Ascending"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <NewTaskDialog />
        </div>
    )
}