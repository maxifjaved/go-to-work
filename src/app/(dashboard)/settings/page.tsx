import { Separator } from "@/components/ui/separator"
import { GeneralSettingsForm } from "@/components/settings/general-form"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">General Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Configure general application settings and preferences.
                </p>
            </div>
            <Separator />
            <GeneralSettingsForm />
        </div>
    )
}