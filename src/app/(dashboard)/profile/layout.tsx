'use client'
import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { mockData } from "@/components/data-table/data"

interface ProfileLayoutProps {
    children: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    const router = useRouter()
    const pathname = usePathname()

    const getActiveTab = () => {
        if (pathname.endsWith('activity')) return 'activity'
        if (pathname.endsWith('tasks')) return 'tasks'
        if (pathname.endsWith('teams')) return 'teams'
        if (pathname.endsWith('settings')) return 'settings'
        return 'overview'
    }

    const handleTabChange = (value: string) => {
        switch (value) {
            case 'overview':
                router.push('/profile')
                break
            case 'activity':
                router.push('/profile/activity')
                break
            case 'tasks':
                router.push('/profile/tasks')
                break
            case 'teams':
                router.push('/profile/teams')
                break
            case 'settings':
                router.push('/profile/settings')
                break
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-0.5">
                <Breadcrumbs />
            </div>
            <Separator />

            <Tabs value={getActiveTab()} onValueChange={handleTabChange}>
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="teams">Teams</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="space-y-6">
                {children}
            </div>
        </div>
    )
}