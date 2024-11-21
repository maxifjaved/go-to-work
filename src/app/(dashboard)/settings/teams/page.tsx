import { Separator } from "@/components/ui/separator"
import { TeamsAndAccessSettings } from "@/components/settings/teams-access-settings"

export default function TeamsAccessPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Teams & Access</h3>
                <p className="text-sm text-muted-foreground">
                    Manage teams, roles, and access permissions.
                </p>
            </div>
            <Separator />
            <TeamsAndAccessSettings />
        </div>
    )
}