import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface QuickFilter {
    id: string
    label: string
    count?: number
}

const quickFilters: QuickFilter[] = [
    { id: 'all', label: 'All Projects', count: 24 },
    { id: 'my', label: 'My Projects', count: 12 },
    { id: 'recent', label: 'Recent', count: 8 },
    { id: 'starred', label: 'Starred', count: 5 },
    { id: 'archived', label: 'Archived', count: 3 },
]

export function ProjectQuickFilters() {
    const [activeFilter, setActiveFilter] = useState('all')

    return (
        <div className="flex items-center space-x-4 overflow-auto pb-2">
            {quickFilters.map((filter) => (
                <Badge
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    className={cn(
                        "cursor-pointer hover:bg-muted transition-colors",
                        activeFilter === filter.id && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => setActiveFilter(filter.id)}
                >
                    {filter.label}
                    {filter.count && (
                        <span className="ml-2 text-xs">
                            ({filter.count})
                        </span>
                    )}
                </Badge>
            ))}
        </div>
    )
}