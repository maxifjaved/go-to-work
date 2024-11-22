'use client'
import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { TeamHeader } from "@/components/team/team-header"
import { LoadingTeam } from "@/components/team/loading"

interface TeamLayoutProps {
    children: React.ReactNode
}

export default function TeamLayout({ children }: TeamLayoutProps) {
    const router = useRouter()
    const pathname = usePathname()

    const getActiveTab = () => {
        if (pathname.endsWith('groups')) return 'groups'
        if (pathname.endsWith('roles')) return 'roles'
        if (pathname.endsWith('permissions')) return 'permissions'
        if (pathname.endsWith('departments')) return 'departments'
        return 'members'
    }

    const handleTabChange = (value: string) => {
        switch (value) {
            case 'members':
                router.push('/team')
                break
            case 'groups':
                router.push('/team/groups')
                break
            case 'roles':
                router.push('/team/roles')
                break
            case 'permissions':
                router.push('/team/permissions')
                break
            case 'departments':
                router.push('/team/departments')
                break
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-0.5">
                <Breadcrumbs />
            </div>
            <Separator />

            <TeamHeader />

            <Tabs value={getActiveTab()} onValueChange={handleTabChange}>
                <TabsList>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="groups">Groups</TabsTrigger>
                    <TabsTrigger value="roles">Roles</TabsTrigger>
                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                    <TabsTrigger value="departments">Departments</TabsTrigger>
                </TabsList>
            </Tabs>

            <Suspense fallback={<LoadingTeam />}>
                {children}
            </Suspense>
        </div>
    )
}