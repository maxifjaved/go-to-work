"use client"

import { createContext, useContext, useState } from "react"
import { DateRange } from "react-day-picker"
import { subDays, startOfMonth, endOfMonth } from "date-fns"

type DateRangePreset = "7d" | "30d" | "90d" | "ytd" | "all" | "custom"
type ComparisonType = "previous_period" | "previous_year" | "none"
type GroupBy = "day" | "week" | "month"

interface AnalyticsContextType {
    dateRange: DateRange | undefined
    setDateRange: (range: DateRange | undefined) => void
    preset: DateRangePreset
    setPreset: (preset: DateRangePreset) => void
    comparisonType: ComparisonType
    setComparisonType: (type: ComparisonType) => void
    groupBy: GroupBy
    setGroupBy: (group: GroupBy) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subDays(new Date(), 30),
        to: new Date(),
    })
    const [preset, setPreset] = useState<DateRangePreset>("30d")
    const [comparisonType, setComparisonType] = useState<ComparisonType>("previous_period")
    const [groupBy, setGroupBy] = useState<GroupBy>("day")

    return (
        <AnalyticsContext.Provider
            value={{
                dateRange,
                setDateRange,
                preset,
                setPreset,
                comparisonType,
                setComparisonType,
                groupBy,
                setGroupBy,
            }}
        >
            {children}
        </AnalyticsContext.Provider>
    )
}

export function useAnalytics() {
    const context = useContext(AnalyticsContext)
    if (!context) {
        throw new Error("useAnalytics must be used within AnalyticsProvider")
    }
    return context
}