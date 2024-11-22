"use client"

import { usePathname } from "next/navigation"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { mockData } from "@/components/data-table/data"

interface ProjectBreadcrumbsProps {
    projectId: string
}

export function ProjectBreadcrumbs({ projectId }: ProjectBreadcrumbsProps) {
    const pathname = usePathname()
    const project = mockData.projects.find(p => p.id.toString() === projectId)

    const paths = pathname.split("/").filter(Boolean)
    const currentTab = paths[paths.length - 1] === projectId ? "overview" : paths[paths.length - 1]

    // Custom breadcrumb items for project pages
    const items = [
        {
            href: "/projects",
            label: "Projects",
        },
        {
            href: `/projects/${projectId}`,
            label: project?.name || "Loading...",
        }
    ]

    if (currentTab !== "overview") {
        items.push({
            href: `${items[1].href}/${currentTab}`,
            label: currentTab.charAt(0).toUpperCase() + currentTab.slice(1),
        })
    }

    return <Breadcrumbs items={items} />
}