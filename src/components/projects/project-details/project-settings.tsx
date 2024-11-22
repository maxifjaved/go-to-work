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
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockData } from "@/components/data-table/data"
import { useMemo } from "react"

const projectSettingsSchema = z.object({
    name: z.string().min(2, "Project name must be at least 2 characters."),
    key: z.string().min(2, "Project key must be at least 2 characters."),
    description: z.string().optional(),
    visibility: z.enum(["Public", "Private", "Team", "Restricted"]),
    defaultAssignee: z.string(),
    settings: z.object({
        requireEstimates: z.boolean(),
        allowSubtasks: z.boolean(),
        defaultPriority: z.enum(["Low", "Medium", "High", "Urgent"]),
        timeZone: z.string(),
    }),
})

interface ProjectSettingsProps {
    projectId: string
}

export function ProjectSettings({ projectId }: ProjectSettingsProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const form = useForm<z.infer<typeof projectSettingsSchema>>({
        resolver: zodResolver(projectSettingsSchema),
        defaultValues: {
            name: project?.name,
            key: project?.key,
            description: project?.description,
            visibility: project?.visibility,
            defaultAssignee: project?.settings.defaultAssignee.toString(),
            settings: {
                requireEstimates: project?.settings.requireEstimates,
                allowSubtasks: project?.settings.allowSubtasks,
                defaultPriority: project?.settings.defaultPriority,
                timeZone: project?.settings.timeZone,
            },
        },
    })

    if (!project) return null

    function onSubmit(values: z.infer<typeof projectSettingsSchema>) {
        // Here you would update the project settings
        console.log(values)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>General</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="key"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Key</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This key is used to generate task IDs
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="visibility"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Visibility</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select visibility" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Public">Public</SelectItem>
                                                <SelectItem value="Private">Private</SelectItem>
                                                <SelectItem value="Team">Team Only</SelectItem>
                                                <SelectItem value="Restricted">Restricted</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Save Changes</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-8">
                            <FormField
                                control={form.control}
                                name="settings.requireEstimates"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Require Estimates
                                            </FormLabel>
                                            <FormDescription>
                                                Require time estimates for all tasks
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
                                name="settings.allowSubtasks"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Allow Subtasks
                                            </FormLabel>
                                            <FormDescription>
                                                Allow tasks to have subtasks
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

                            <Button type="submit">Save Preferences</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}