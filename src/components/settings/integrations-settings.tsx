"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const availableIntegrations = [
    {
        id: "github",
        name: "GitHub",
        description: "Connect your repositories and track development progress.",
        icon: "github",
        connected: true,
        config: {
            webhook_url: "https://api.example.com/webhooks/github",
            api_key: "****************************",
        },
    },
    {
        id: "slack",
        name: "Slack",
        description: "Get notifications and updates in your Slack channels.",
        icon: "slack",
        connected: false,
    },
    {
        id: "jira",
        name: "Jira",
        description: "Sync tasks and issues with Jira projects.",
        icon: "jira",
        connected: false,
    },
    {
        id: "google",
        name: "Google Calendar",
        description: "Sync meetings and deadlines with Google Calendar.",
        icon: "google",
        connected: true,
        config: {
            calendar_id: "primary",
            sync_enabled: true,
        },
    },
]

export function IntegrationsSettings() {
    const [integrations, setIntegrations] = useState(availableIntegrations)

    const toggleIntegration = (id: string) => {
        setIntegrations(
            integrations.map((integration) =>
                integration.id === id
                    ? { ...integration, connected: !integration.connected }
                    : integration
            )
        )
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-6">
                {integrations.map((integration) => (
                    <Card key={integration.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="flex items-center gap-2">
                                        {integration.name}
                                        {integration.connected && (
                                            <Badge variant="secondary">Connected</Badge>
                                        )}
                                    </CardTitle>
                                    <CardDescription>{integration.description}</CardDescription>
                                </div>
                                <Switch
                                    checked={integration.connected}
                                    onCheckedChange={() => toggleIntegration(integration.id)}
                                />
                            </div>
                        </CardHeader>
                        {integration.connected && integration.config && (
                            <CardContent>
                                <div className="space-y-4">
                                    {Object.entries(integration.config).map(([key, value]) => (
                                        <div key={key} className="space-y-2">
                                            <Label htmlFor={key}>
                                                {key.split("_").map(word =>
                                                    word.charAt(0).toUpperCase() + word.slice(1)
                                                ).join(" ")}
                                            </Label>
                                            <Input
                                                id={key}
                                                value={value}
                                                readOnly
                                                type={key.includes("key") || key.includes("token") ? "password" : "text"}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        )}
                        <CardFooter>
                            <div className="flex space-x-2">
                                {integration.connected ? (
                                    <>
                                        <Button variant="outline">Configure</Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => toggleIntegration(integration.id)}
                                        >
                                            Disconnect
                                        </Button>
                                    </>
                                ) : (
                                    <Button onClick={() => toggleIntegration(integration.id)}>
                                        Connect
                                    </Button>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}