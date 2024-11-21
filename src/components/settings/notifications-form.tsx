"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const notificationsFormSchema = z.object({
    email: z.object({
        enabled: z.boolean(),
        frequency: z.string(),
        types: z.array(z.string()),
    }),
    push: z.object({
        enabled: z.boolean(),
        types: z.array(z.string()),
    }),
    desktop: z.object({
        enabled: z.boolean(),
        sound: z.boolean(),
    }),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

const notificationTypes = [
    {
        id: "task_assigned",
        label: "Task Assigned",
        description: "When a task is assigned to you",
    },
    {
        id: "task_completed",
        label: "Task Completed",
        description: "When a task you're involved with is completed",
    },
    {
        id: "mentions",
        label: "Mentions",
        description: "When someone mentions you in comments",
    },
    {
        id: "project_updates",
        label: "Project Updates",
        description: "Updates about projects you're involved in",
    },
    {
        id: "team_activity",
        label: "Team Activity",
        description: "Activity from your team members",
    },
]

export function NotificationsForm() {
    const form = useForm<NotificationsFormValues>({
        resolver: zodResolver(notificationsFormSchema),
        defaultValues: {
            email: {
                enabled: true,
                frequency: "daily",
                types: ["task_assigned", "mentions"],
            },
            push: {
                enabled: true,
                types: ["task_assigned", "mentions"],
            },
            desktop: {
                enabled: true,
                sound: true,
            },
        },
    })

    function onSubmit(data: NotificationsFormValues) {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Email Notifications</CardTitle>
                        <CardDescription>
                            Configure your email notification preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email.enabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <div>
                                        <FormLabel>Enable Email Notifications</FormLabel>
                                        <FormDescription>
                                            Receive notifications via email.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email.frequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Digest Frequency</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select frequency" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="instant">Instant</SelectItem>
                                            <SelectItem value="daily">Daily Digest</SelectItem>
                                            <SelectItem value="weekly">Weekly Digest</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        How often you want to receive email notifications.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email.types"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel>Notification Types</FormLabel>
                                        <FormDescription>
                                            Select which notifications you want to receive via email.
                                        </FormDescription>
                                    </div>
                                    {notificationTypes.map((type) => (
                                        <FormField
                                            key={type.id}
                                            control={form.control}
                                            name="email.types"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={type.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(type.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, type.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== type.id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel>
                                                                {type.label}
                                                            </FormLabel>
                                                            <FormDescription>
                                                                {type.description}
                                                            </FormDescription>
                                                        </div>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Push Notifications</CardTitle>
                        <CardDescription>
                            Configure mobile push notification preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="push.enabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <div>
                                        <FormLabel>Enable Push Notifications</FormLabel>
                                        <FormDescription>
                                            Receive notifications on your mobile device.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="push.types"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel>Push Notification Types</FormLabel>
                                        <FormDescription>
                                            Select which notifications you want to receive on your mobile device.
                                        </FormDescription>
                                    </div>
                                    {notificationTypes.map((type) => (
                                        <FormField
                                            key={type.id}
                                            control={form.control}
                                            name="push.types"
                                            render={({ field }) => (
                                                <FormItem
                                                    key={type.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(type.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, type.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== type.id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            {type.label}
                                                        </FormLabel>
                                                        <FormDescription>
                                                            {type.description}
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Desktop Notifications</CardTitle>
                        <CardDescription>
                            Configure desktop notification preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="desktop.enabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <div>
                                        <FormLabel>Enable Desktop Notifications</FormLabel>
                                        <FormDescription>
                                            Show notifications in your browser.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="desktop.sound"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <div>
                                        <FormLabel>Notification Sound</FormLabel>
                                        <FormDescription>
                                            Play a sound when notifications arrive.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Button type="submit">Save Notification Preferences</Button>
            </form>
        </Form>
    )
}