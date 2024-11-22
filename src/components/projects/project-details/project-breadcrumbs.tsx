import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { mockData } from "@/components/data-table/data"

interface ProjectBreadcrumbsProps {
    projectId: string
}

export function ProjectBreadcrumbs({ projectId }: ProjectBreadcrumbsProps) {
    const pathname = usePathname()
    const project = mockData.projects.find(p => p.id.toString() === projectId)

    // Build breadcrumb items based on the current pathname
    const getBreadcrumbs = () => {
        const items = [
            { href: "/", label: "Home" },
            { href: "/projects", label: "Projects" },
            { href: `/projects/${projectId}`, label: project?.name || "Project" },
        ]

        if (pathname.includes('/analytics')) {
            items.push({ href: `/projects/${projectId}/analytics`, label: "Analytics" })
        } else if (pathname.includes('/team')) {
            items.push({ href: `/projects/${projectId}/team`, label: "Team" })
        } else if (pathname.includes('/settings')) {
            items.push({ href: `/projects/${projectId}/settings`, label: "Settings" })
        }

        return items
    }

    const breadcrumbs = getBreadcrumbs()

    return (
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
            {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1

                return (
                    <div key={item.href} className="flex items-center">
                        {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
                        <Link
                            href={item.href}
                            className={`hover:text-foreground ${
                                isLast ? "text-foreground font-medium" : ""
                            }`}
                        >
                            {index === 0 ? (
                                <Home className="h-4 w-4" />
                            ) : (
                                item.label
                            )}
                        </Link>
                    </div>
                )
            })}
        </nav>
    )
}