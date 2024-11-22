"use client"

import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge"
import {X} from "lucide-react"
import {useTasks} from "./tasks-context"
import {mockData} from "@/components/data-table/data"

interface TasksFiltersProps {
    hideProjectFilter?: boolean
}

export function TasksFilters({hideProjectFilter}: TasksFiltersProps) {
    const {filters, setFilters, searchQuery, setSearchQuery} = useTasks()

    const clearFilter = (type: string, value: string) => {
        setFilters({
            ...filters,
            [type]: filters[type as keyof typeof filters].filter((v: string) => v !== value)
        })
    }

    const clearAllFilters = () => {
        setFilters({
            ...filters,
            status: [],
            priority: [],
            assignee: [],
            ...(hideProjectFilter ? {} : {project: []})
        })
        setSearchQuery("")
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                <div className="flex-1 min-w-[300px]">
                    <Input
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select
                    onValueChange={(value) =>
                        setFilters({
                            ...filters,
                            status: [...filters.status, value]
                        })
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status"/>
                    </SelectTrigger>
                    <SelectContent>
                        {["Backlog", "Todo", "In Progress", "In Review", "Done"].map((status) => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(value) =>
                        setFilters({
                            ...filters,
                            priority: [...filters.priority, value]
                        })
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Priority"/>
                    </SelectTrigger>
                    <SelectContent>
                        {["Low", "Medium", "High", "Urgent"].map((priority) => (
                            <SelectItem key={priority} value={priority}>
                                {priority}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(value) =>
                        setFilters({
                            ...filters,
                            assignee: [...filters.assignee, value]
                        })
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Assignee"/>
                    </SelectTrigger>
                    <SelectContent>
                        {mockData.users.map((user) => (
                            <SelectItem key={user.id} value={user.id.toString()}>
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {!hideProjectFilter && (
                    <Select
                        onValueChange={(value) =>
                            setFilters({
                                ...filters,
                                project: [...filters.project, value]
                            })
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Project"/>
                        </SelectTrigger>
                        <SelectContent>
                            {mockData.projects.map((project) => (
                                <SelectItem key={project.id} value={project.id.toString()}>
                                    {project.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

            </div>

            {(Object.values(filters).some(arr => arr.length > 0) || searchQuery) && (
                <div className="flex flex-wrap gap-2">
                    {Object.entries(filters).map(([type, values]) =>
                        (values as string[]).map((value) => (
                            <Badge key={`${type}-${value}`} variant="secondary">
                                {type}: {value}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 ml-2 hover:bg-transparent"
                                    onClick={() => clearFilter(type, value)}
                                >
                                    <X className="h-3 w-3"/>
                                </Button>
                            </Badge>
                        ))
                    )}
                    {searchQuery && (
                        <Badge variant="secondary">
                            Search: {searchQuery}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-2 hover:bg-transparent"
                                onClick={() => setSearchQuery("")}
                            >
                                <X className="h-3 w-3"/>
                            </Button>
                        </Badge>
                    )}
                    {(Object.values(filters).some(arr => arr.length > 0) || searchQuery) && (
                        <Button
                            variant="ghost"
                            className="h-7 text-sm"
                            onClick={clearAllFilters}
                        >
                            Clear all
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}