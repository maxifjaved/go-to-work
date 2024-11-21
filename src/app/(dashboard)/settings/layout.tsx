import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/settings/sidebar-nav"
import { LoadingSettings } from "@/components/settings/loading"

const sidebarNavItems = [
    {
        title: "General",
        href: "/settings",
    },
    {
        title: "Account",
        href: "/settings/account",
    },
    {
        title: "Appearance",
        href: "/settings/appearance",
    },
    {
        title: "Notifications",
        href: "/settings/notifications",
    },
    {
        title: "Integrations",
        href: "/settings/integrations",
    },
    {
        title: "Teams & Access",
        href: "/settings/teams",
    },
]

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>
            <Separator />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1">
                    <Suspense fallback={<LoadingSettings />}>
                        {children}
                    </Suspense>
                </div>
            </div>
        </div>
    )
}