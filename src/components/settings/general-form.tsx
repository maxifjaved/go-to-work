"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const generalSettingsSchema = z.object({
    organizationName: z.string().min(2).max(50),
    defaultTimeZone: z.string(),
    dateFormat: z.string(),
    timeFormat: z.string(),
    workingDays: z.array(z.string()),
    workingHours: z.object({
        start: z.string(),
        end: z.string(),
    }),
    enableNotifications: z.boolean(),
})

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>

export function GeneralSettingsForm() {
    const form = useForm<GeneralSettingsValues>({
        resolver: zodResolver(generalSettingsSchema),
        defaultValues: {
            organizationName: "My Organization",
            defaultTimeZone: "UTC",
            dateFormat: "MM/DD/YYYY",
            timeFormat: "12h",
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            workingHours: {
                start: "09:00",
                end: "17:00",
            },
            enableNotifications: true,
        },
    })

    function onSubmit(data: GeneralSettingsValues) {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organization Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your organization's display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="defaultTimeZone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Default Time Zone</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select timezone" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="UTC">UTC</SelectItem>
                                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                                    <SelectItem value="Europe/London">London</SelectItem>
                                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Set the default timezone for your organization.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid gap-6 grid-cols-2">
                    <FormField
                        control={form.control}
                        name="dateFormat"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date Format</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select date format" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="timeFormat"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time Format</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select time format" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="12h">12 Hour</SelectItem>
                                        <SelectItem value="24h">24 Hour</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-6 grid-cols-2">
                    <FormField
                        control={form.control}
                        name="workingHours.start"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Working Hours Start</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="workingHours.end"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Working Hours End</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="enableNotifications"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Enable Notifications
                                </FormLabel>
                                <FormDescription>
                                    Receive notifications about task updates and mentions.
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

                <Button type="submit">Save Changes</Button>
            </form>
        </Form>
    )
}