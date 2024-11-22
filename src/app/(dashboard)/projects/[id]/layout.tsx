import { Suspense } from "react"
import { ProjectBreadcrumbs } from "@/components/projects/project-details/project-breadcrumbs"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

interface ProjectLayoutProps {
    children: React.ReactNode
    params: {
        id: string
    }
}

export default function ProjectLayout({ children, params }: ProjectLayoutProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-0.5">
                <Suspense fallback={<Skeleton className="h-6 w-[200px]" />}>
                    <ProjectBreadcrumbs projectId={params.id} />
                </Suspense>
            </div>
            <Separator />
            {children}
        </div>
    )
}