'use client'
import { Suspense } from "react"
import { TasksHeader } from "@/components/tasks/tasks-header"
import { TasksFilters } from "@/components/tasks/tasks-filters"
import { LoadingTasks } from "@/components/tasks/loading"
import { TasksProvider } from "@/components/tasks/tasks-context"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"

export default function TasksLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()

    const getActiveTab = () => {
        if (pathname.endsWith('/kanban')) return 'kanban'
        if (pathname.endsWith('/calendar')) return 'calendar'
        return 'list'
    }

    const handleTabChange = (value: string) => {
        switch (value) {
            case 'list':
                router.push('/tasks')
                break
            case 'kanban':
                router.push('/tasks/kanban')
                break
            case 'calendar':
                router.push('/tasks/calendar')
                break
        }
    }

    return (
        <TasksProvider>
            <div className="space-y-6">
                <div className="space-y-0.5">
                    <Breadcrumbs />
                </div>
                <Separator />

                <TasksHeader />

                <Tabs value={getActiveTab()} onValueChange={handleTabChange}>
                    <TabsList>
                        <TabsTrigger value="list">List View</TabsTrigger>
                        <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
                        <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    </TabsList>
                </Tabs>

                <TasksFilters />

                <Suspense fallback={<LoadingTasks />}>
                    {children}
                </Suspense>
            </div>
        </TasksProvider>
    )
}