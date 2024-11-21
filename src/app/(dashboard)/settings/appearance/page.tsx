import { Separator } from "@/components/ui/separator"
import { AppearanceForm } from "@/components/settings/appearance-form"

export default function AppearanceSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Appearance</h3>
                <p className="text-sm text-muted-foreground">
                    Customize the appearance and theme of your workspace.
                </p>
            </div>
            <Separator />
            <AppearanceForm />
        </div>
    )
}