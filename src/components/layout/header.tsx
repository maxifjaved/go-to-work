"use client"

import { MainNav } from "@/components/layout/main-nav"
import { Search } from "@/components/layout/search"
import { UserNav } from "@/components/layout/user-nav"
import { ModeToggle } from "@/components/layout/mode-toggle"

export function Header() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background">
            <div className="flex h-16 items-center px-4">
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <Search />
                    <ModeToggle />
                    <UserNav />
                </div>
            </div>
        </div>
    )
}