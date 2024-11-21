"use client"

import { createContext, useContext, useState } from "react"

type ViewType = "grid" | "list"
type SortType = "name" | "created" | "status" | "progress"
type SortDirection = "asc" | "desc"

interface ProjectsViewContextType {
    view: ViewType
    setView: (view: ViewType) => void
    sortBy: SortType
    setSortBy: (sort: SortType) => void
    sortDirection: SortDirection
    setSortDirection: (direction: SortDirection) => void
}

const ProjectsViewContext = createContext<ProjectsViewContextType | undefined>(undefined)

export function ProjectsViewProvider({ children }: { children: React.ReactNode }) {
    const [view, setView] = useState<ViewType>("grid")
    const [sortBy, setSortBy] = useState<SortType>("name")
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

    return (
        <ProjectsViewContext.Provider
            value={{
                view,
                setView,
                sortBy,
                setSortBy,
                sortDirection,
                setSortDirection,
            }}
        >
            {children}
        </ProjectsViewContext.Provider>
    )
}

export function useProjectsView() {
    const context = useContext(ProjectsViewContext)
    if (!context) {
        throw new Error("useProjectsView must be used within ProjectsViewProvider")
    }
    return context
}