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
import { X, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface Filter {
    type: string
    value: string
    label: string
}

export function ProjectsFilters() {
    const [activeFilters, setActiveFilters] = useState<Filter[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    const addFilter = (type: string, value: string, label: string) => {
        if (!activeFilters.some(f => f.type === type && f.value === value)) {
            setActiveFilters([...activeFilters, { type, value, label }])
        }
    }

    const removeFilter = (type: string, value: string) => {
        setActiveFilters(activeFilters.filter(f => !(f.type === type && f.value === value)))
    }

    const clearAllFilters = () => {
        setActiveFilters([])
        setSearchQuery("")
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                <div className="flex-1 min-w-[300px]">
                    <Input
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select onValueChange={(value) => addFilter("status", value, `Status: ${value}`)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => addFilter("department", value, `Department: ${value}`)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                </Select>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            More Filters
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px]" align="end">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Priority</Label>
                                <div className="space-y-2">
                                    {['Low', 'Medium', 'High', 'Urgent'].map((priority) => (
                                        <div key={priority} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={priority}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        addFilter("priority", priority.toLowerCase(), `Priority: ${priority}`)
                                                    } else {
                                                        removeFilter("priority", priority.toLowerCase())
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={priority}>{priority}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Label>Team Size</Label>
                                <div className="space-y-2">
                                    {['Small (1-5)', 'Medium (6-10)', 'Large (11+)'].map((size) => (
                                        <div key={size} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={size}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        addFilter("team_size", size.toLowerCase(), `Team Size: ${size}`)
                                                    } else {
                                                        removeFilter("team_size", size.toLowerCase())
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={size}>{size}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {(activeFilters.length > 0 || searchQuery) && (
                <div className="flex flex-wrap items-center gap-2">
                    {searchQuery && (
                        <Badge variant="secondary">
                            Search: {searchQuery}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-2 hover:bg-transparent"
                                onClick={() => setSearchQuery("")}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    )}
                    {activeFilters.map((filter) => (
                        <Badge
                            key={`${filter.type}-${filter.value}`}
                            variant="secondary"
                        >
                            {filter.label}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-2 hover:bg-transparent"
                                onClick={() => removeFilter(filter.type, filter.value)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    ))}
                    {(activeFilters.length > 0 || searchQuery) && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="h-7"
                        >
                            Clear all
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}