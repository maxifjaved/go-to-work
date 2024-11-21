import { Separator } from "@/components/ui/separator"
import { AccountSettingsForm } from "@/components/settings/account-form"

export default function AccountSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your account information and preferences.
                </p>
            </div>
            <Separator />
            <AccountSettingsForm />
        </div>
    )
}