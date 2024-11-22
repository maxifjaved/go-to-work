import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { mockData } from "@/components/data-table/data"

interface TeamMemberLayoutProps {
    children: React.ReactNode
    params: {
        id: string
    }
}

export default function TeamMemberLayout({ children, params }: TeamMemberLayoutProps) {
    const router = useRouter()
    const pathname = usePathname()
    const member = mockData.users.find(u => u.id.toString() === params.id)

    if (!member) {
        return <div>Team member not found</div>
    }

    const getActiveTab = () => {
        if (pathname.endsWith('tasks')) return 'tasks'
        if (pathname.endsWith('projects')) return 'projects'
        if (pathname.endsWith('activity')) return 'activity'
        if (pathname.endsWith('settings')) return 'settings'
        return 'overview'
    }

    const handleTabChange = (value: string) => {
        switch (value) {
            case 'overview':
                router.push(`/team/${params.id}`)
                break
            case 'tasks':
                router.push(`/team/${params.id}/tasks`)
                break
            case 'projects':
                router.push(`/team/${params.id}/projects`)
                break
            case 'activity':
                router.push(`/team/${params.id}/activity`)
                break
            case 'settings':
                router.push(`/team/${params.id}/settings`)
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
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                </div>
            </Tabs>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    )
}