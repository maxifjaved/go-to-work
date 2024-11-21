"use client"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Breadcrumbs() {
    const pathname = usePathname()
    const paths = pathname.split("/").filter(Boolean)

    if (paths.length === 0) return null

    return (
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Link
                href="/"
                className="flex items-center hover:text-foreground"
            >
                <Home className="h-4 w-4" />
            </Link>
            {paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join("/")}`
                const isLast = index === paths.length - 1

                return (
                    <div key={path} className="flex items-center">
                        <ChevronRight className="h-4 w-4" />
                        <Link
                            href={href}
                            className={`capitalize hover:text-foreground ${
                                isLast ? "text-foreground font-medium" : ""
                            }`}
                        >
                            {path.replace(/-/g, " ")}
                        </Link>
                    </div>
                )
            })}
        </nav>
    )
}