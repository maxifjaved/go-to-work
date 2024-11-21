"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { useEffect } from "react"

const appearanceFormSchema = z.object({
    theme: z.enum(["light", "dark", "system"]),
    fontSize: z.enum(["sm", "md", "lg", "xl"]),
    layout: z.enum(["default", "compact", "comfortable"]),
    animation: z.enum(["default", "reduced", "none"]),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export function AppearanceForm() {
    const { theme, setTheme } = useTheme()

    const form = useForm<AppearanceFormValues>({
        resolver: zodResolver(appearanceFormSchema),
        defaultValues: {
            theme: "system",
            fontSize: "md",
            layout: "default",
            animation: "default",
        },
    })

    useEffect(() => {
        if (theme) {
            form.setValue("theme", theme as "light" | "dark" | "system")
        }
    }, [theme, form])

    function onSubmit(data: AppearanceFormValues) {
        setTheme(data.theme)
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Theme</FormLabel>
                            <FormDescription>
                                Select the theme for your workspace.
                            </FormDescription>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-3 gap-4"
                                >
                                    {[
                                        {
                                            value: "light",
                                            label: "Light",
                                            description: "Light mode theme",
                                        },
                                        {
                                            value: "dark",
                                            label: "Dark",
                                            description: "Dark mode theme",
                                        },
                                        {
                                            value: "system",
                                            label: "System",
                                            description: "Follow system theme",
                                        },
                                    ].map((theme) => (
                                        <Card key={theme.value}>
                                            <CardContent className="p-6">
                                                <RadioGroupItem
                                                    value={theme.value}
                                                    id={theme.value}
                                                    className="sr-only"
                                                />
                                                <FormLabel htmlFor={theme.value}>
                                                    <div className="flex flex-col gap-2">
                            <span className="font-semibold">
                              {theme.label}
                            </span>
                                                        <span className="text-sm text-muted-foreground">
                              {theme.description}
                            </span>
                                                    </div>
                                                </FormLabel>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fontSize"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Font Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select font size" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {[
                                        { value: "sm", label: "Small" },
                                        { value: "md", label: "Medium" },
                                        { value: "lg", label: "Large" },
                                        { value: "xl", label: "Extra Large" },
                                    ].map((size) => (
                                        <SelectItem key={size.value} value={size.value}>
                                            {size.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Choose the font size for the interface.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="layout"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Layout Density</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select layout density" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {[
                                        { value: "default", label: "Default" },
                                        { value: "compact", label: "Compact" },
                                        { value: "comfortable", label: "Comfortable" },
                                    ].map((layout) => (
                                        <SelectItem key={layout.value} value={layout.value}>
                                            {layout.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Adjust the spacing and density of the interface.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="animation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Animation</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select animation preference" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {[
                                        { value: "default", label: "Default" },
                                        { value: "reduced", label: "Reduced" },
                                        { value: "none", label: "None" },
                                    ].map((animation) => (
                                        <SelectItem key={animation.value} value={animation.value}>
                                            {animation.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Control the level of animation and motion effects.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Save Preferences</Button>
            </form>
        </Form>
    )
}