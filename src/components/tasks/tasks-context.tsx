"use client"

import { createContext, useContext, useState } from "react"

type ViewType = "board" | "list"
type SortType = "priority" | "dueDate" | "status" | "assignee"
type SortDirection = "asc" | "desc"
type GroupBy = "status" | "priority" | "assignee" | "project"

interface TasksContextType {
    view: ViewType
    setView: (view: ViewType) => void
    sortBy: SortType
    setSortBy: (sort: SortType) => void
    sortDirection: SortDirection
    setSortDirection: (direction: SortDirection) => void
    groupBy: GroupBy
    setGroupBy: (group: GroupBy) => void
    selectedTasks: string[]
    setSelectedTasks: (tasks: string[]) => void
    searchQuery: string
    setSearchQuery: (query: string) => void
    filters: {
        status: string[]
        priority: string[]
        assignee: string[]
        project: string[]
    }
    // @ts-expect-error - filters is an object
    setFilters: (filters) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [view, setView] = useState<ViewType>("board")
    const [sortBy, setSortBy] = useState<SortType>("priority")
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
    const [groupBy, setGroupBy] = useState<GroupBy>("status")
    const [selectedTasks, setSelectedTasks] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [filters, setFilters] = useState({
        status: [],
        priority: [],
        assignee: [],
        project: [],
    })

    return (
        <TasksContext.Provider
            value={{
                view,
                setView,
                sortBy,
                setSortBy,
                sortDirection,
                setSortDirection,
                groupBy,
                setGroupBy,
                selectedTasks,
                setSelectedTasks,
                searchQuery,
                setSearchQuery,
                filters,
                setFilters,
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}

export function useTasks() {
    const context = useContext(TasksContext)
    if (!context) {
        throw new Error("useTasks must be used within TasksProvider")
    }
    return context
}