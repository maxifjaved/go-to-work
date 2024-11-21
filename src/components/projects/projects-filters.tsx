"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"

export function ProjectsFilters() {
    const [activeFilters, setActiveFilters] = useState<string[]>([])

    const statuses = ['Active', 'On Hold', 'Completed', 'Archived']
    const departments = ['Development', 'Marketing', 'Design', 'Research']

    const addFilter = (filter: string) => {
        if (!activeFilters.includes(filter)) {
            setActiveFilters([...activeFilters, filter])
        }
    }

    const removeFilter = (filter: string) => {
        setActiveFilters(activeFilters.filter(f => f !== filter))
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                <div className="flex-1 min-w-[300px]">
                    <Input placeholder="Search projects..." />
                </div>
                <Select onValueChange={addFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {statuses.map(status => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={addFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                        {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>
                                {dept}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {activeFilters.map(filter => (
                        <Badge key={filter} variant="secondary">
                            {filter}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-2 hover:bg-transparent"
                                onClick={() => removeFilter(filter)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    ))}
                    {activeFilters.length > 0 && (
                        <Button
                            variant="ghost"
                            className="h-7 text-sm"
                            onClick={() => setActiveFilters([])}
                        >
                            Clear all
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}