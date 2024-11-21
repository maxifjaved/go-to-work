import { Separator } from "@/components/ui/separator"
import { IntegrationsSettings } from "@/components/settings/integrations-settings"

export default function IntegrationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Integrations</h3>
                <p className="text-sm text-muted-foreground">
                    Connect and manage third-party integrations and services.
                </p>
            </div>
            <Separator />
            <IntegrationsSettings />
        </div>
    )
}