"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CalendarIcon, TrendingUp } from "lucide-react"
import { format } from "date-fns"
import { useAnalytics } from "./analytics-context"

const presets = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 90 days", value: "90d" },
    { label: "Year to date", value: "ytd" },
    { label: "All time", value: "all" },
]

export function AnalyticsFilters() {
    const {
        dateRange,
        setDateRange,
        preset,
        setPreset,
        comparisonType,
        setComparisonType,
        groupBy,
        setGroupBy,
    } = useAnalytics()

    return (
        <div className="flex flex-wrap items-center gap-2 mb-8">
            <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "justify-start text-left font-normal w-[240px]",
                                    !dateRange && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange?.from ? (
                                    dateRange.to ? (
                                        <>
                                            {format(dateRange.from, "LLL dd, y")} -{" "}
                                            {format(dateRange.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(dateRange.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date range</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>

                    <Select value={preset} onValueChange={(value: any) => setPreset(value)}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Select preset" />
                        </SelectTrigger>
                        <SelectContent>
                            {presets.map((preset) => (
                                <SelectItem key={preset.value} value={preset.value}>
                                    {preset.label}
                                </SelectItem>
                            ))}
                            <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Select value={comparisonType} onValueChange={(value: any) => setComparisonType(value)}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select comparison" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="previous_period">Previous Period</SelectItem>
                            <SelectItem value="previous_year">Previous Year</SelectItem>
                            <SelectItem value="none">No Comparison</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={groupBy} onValueChange={(value: any) => setGroupBy(value)}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Group by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">By Day</SelectItem>
                            <SelectItem value="week">By Week</SelectItem>
                            <SelectItem value="month">By Month</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button variant="outline" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Download Report
            </Button>
        </div>
    )
}