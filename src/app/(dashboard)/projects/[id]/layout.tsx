'use client'

import { Suspense } from "react"
import { ProjectBreadcrumbs } from "@/components/projects/project-details/project-breadcrumbs"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"
import { mockData } from "@/components/data-table/data"

interface ProjectLayoutProps {
    children: React.ReactNode
    params: {
        id: string
    }
}

export default function ProjectLayout({ children, params }: ProjectLayoutProps) {
    const router = useRouter()
    const pathname = usePathname()
    const project = mockData.projects.find(p => p.id.toString() === params.id)

    // Get the current active tab from the pathname
    const getActiveTab = () => {
        if (pathname.endsWith('analytics')) return 'analytics'
        if (pathname.endsWith('team')) return 'team'
        if (pathname.endsWith('settings')) return 'settings'
        return 'overview'
    }

    // Handle tab changes
    const handleTabChange = (value: string) => {
        switch (value) {
            case 'overview':
                router.push(`/projects/${params.id}`)
                break
            case 'analytics':
                router.push(`/projects/${params.id}/analytics`)
                break
            case 'team':
                router.push(`/projects/${params.id}/team`)
                break
            case 'settings':
                router.push(`/projects/${params.id}/settings`)
                break
        }
    }

    if (!project) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-6 w-[200px]" />
                <Separator />
                <div className="space-y-8">
                    <Skeleton className="h-[500px]" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="space-y-0.5">
                <Suspense fallback={<Skeleton className="h-6 w-[200px]" />}>
                    <ProjectBreadcrumbs projectId={params.id} />
                </Suspense>
            </div>
            <Separator />
            <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="space-y-4">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="team">Team</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                </div>
            </Tabs>
            {children}
        </div>
    )
}