import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { mockData } from "@/components/data-table/data"

interface TaskDetailsLayoutProps {
    children: React.ReactNode
    params: {
        id: string
    }
}

export default function TaskDetailsLayout({ children, params }: TaskDetailsLayoutProps) {
    const router = useRouter()
    const pathname = usePathname()
    const task = mockData.tasks.find(t => t.id.toString() === params.id)

    if (!task) {
        return <div>Task not found</div>
    }

    const getActiveTab = () => {
        if (pathname.endsWith('history')) return 'history'
        if (pathname.endsWith('attachments')) return 'attachments'
        if (pathname.endsWith('subtasks')) return 'subtasks'
        return 'details'
    }

    const handleTabChange = (value: string) => {
        switch (value) {
            case 'details':
                router.push(`/tasks/${params.id}`)
                break
            case 'history':
                router.push(`/tasks/${params.id}/history`)
                break
            case 'attachments':
                router.push(`/tasks/${params.id}/attachments`)
                break
            case 'subtasks':
                router.push(`/tasks/${params.id}/subtasks`)
                break
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-0.5">
                <Suspense fallback={<Skeleton className="h-6 w-[200px]" />}>
                    <Breadcrumbs />
                </Suspense>
            </div>
            <Separator />
            <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="space-y-4">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
                        <TabsTrigger value="attachments">Attachments</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                </div>
            </Tabs>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    )
}