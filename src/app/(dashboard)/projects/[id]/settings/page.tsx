import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { ProjectSettings } from "@/components/projects/project-details/project-settings"
import { LoadingSettings } from "@/components/settings/loading"

interface ProjectSettingsPageProps {
    params: {
        id: string
    }
}

export default function ProjectSettingsPage({ params }: ProjectSettingsPageProps) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Project Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your project settings and preferences
                </p>
            </div>
            <Separator />
            <Suspense fallback={<LoadingSettings />}>
                <ProjectSettings projectId={params.id} />
            </Suspense>
        </div>
    )
}