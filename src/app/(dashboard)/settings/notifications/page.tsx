import { Separator } from "@/components/ui/separator"
import { NotificationsForm } from "@/components/settings/notifications-form"

export default function NotificationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                    Configure how you want to be notified about activities.
                </p>
            </div>
            <Separator />
            <NotificationsForm />
        </div>
    )
}