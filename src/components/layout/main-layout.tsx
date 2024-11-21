"use client"

import {useState, useEffect} from "react"
import {Sidebar} from "@/components/layout/sidebar"
import {Header} from "@/components/layout/header"
import {CommandMenu} from "@/components/layout/command-menu"
import {NotificationsPopover} from "@/components/layout/notifications-popover"
import {cn} from "@/lib/utils"
import {Bell} from "lucide-react";

interface MainLayoutProps {
    children: React.ReactNode
}

export function MainLayout({children}: MainLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const [isCommandOpen, setIsCommandOpen] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false)
            }
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsCommandOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <div className="min-h-screen">
            <Header
                isSidebarOpen={isSidebarOpen}
                onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <div className="flex h-[calc(100vh-4rem)]">
                <Sidebar
                    isOpen={isSidebarOpen}
                    isMobile={isMobile}
                    onClose={() => setIsSidebarOpen(false)}
                />
                <main className={cn(
                    "flex-1 overflow-y-auto bg-background pt-2 transition-all duration-200 ease-in-out",
                    isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
                )}>
                    <div className="container p-4 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
            <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen}/>
            <NotificationsPopover>
                <Bell className="h-4 w-4"/>
            </NotificationsPopover>
        </div>
    )
}