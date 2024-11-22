'use client'
import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { ReportsHeader } from "@/components/reports/reports-header"
import { LoadingReports } from "@/components/reports/loading"

interface ReportsLayoutProps {
    children: React.ReactNode
}

export default function ReportsLayout({ children }: ReportsLayoutProps) {
    const router = useRouter()
    const pathname = usePathname()

    const getActiveTab = () => {
        if (pathname.endsWith('performance')) return 'performance'
        if (pathname.endsWith('tasks')) return 'tasks'
        if (pathname.endsWith('projects')) return 'projects'
        if (pathname.endsWith('team')) return 'team'
        if (pathname.endsWith('custom')) return 'custom'
        return 'overview'
    }

    const handleTabChange = (value: string) => {
        switch (value) {
            case 'overview':
                router.push('/reports')
                break
            case 'performance':
                router.push('/reports/performance')
                break
            case 'tasks':
                router.push('/reports/tasks')
                break
            case 'projects':
                router.push('/reports/projects')
                break
            case 'team':
                router.push('/reports/team')
                break
            case 'custom':
                router.push('/reports/custom')
                break
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-0.5">
                <Breadcrumbs />
            </div>
            <Separator />

            <ReportsHeader />

            <Tabs value={getActiveTab()} onValueChange={handleTabChange}>
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="custom">Custom Reports</TabsTrigger>
                </TabsList>
            </Tabs>

            <Suspense fallback={<LoadingReports />}>
                {children}
            </Suspense>
        </div>
    )
}