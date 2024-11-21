"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { List, Grid, SlidersHorizontal } from "lucide-react"
import { useProjectsView } from "./projects-view-context"
import { NewProjectDialog } from "./new-project-dialog"

export function ProjectsHeader() {
    const { view, setView, sortBy, setSortBy, sortDirection, setSortDirection } = useProjectsView()

    const handleSort = (key: string) => {
        if (sortBy === key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            // @ts-expect-error - sortDirection is a string
            setSortBy(key)
            setSortDirection("asc")
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground">
                    Manage and track all your projects in one place
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setView(view === "grid" ? "list" : "grid")}
                >
                    {view === "grid" ? (
                        <List className="h-4 w-4" />
                    ) : (
                        <Grid className="h-4 w-4" />
                    )}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleSort("name")}>
                            Name {sortBy === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort("created")}>
                            Created Date {sortBy === "created" && (sortDirection === "asc" ? "↑" : "↓")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort("status")}>
                            Status {sortBy === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort("progress")}>
                            Progress {sortBy === "progress" && (sortDirection === "asc" ? "↑" : "↓")}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <NewProjectDialog />
            </div>
        </div>
    )
}