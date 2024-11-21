"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {mockData} from "@/components/data-table/data";

const accountFormSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    bio: z.string().max(500).optional(),
    title: z.string().min(2).max(50),
    phone: z.string().optional(),
    avatar: z.string().optional(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function AccountSettingsForm() {
    // Use first user from mock data for demo
    const user = mockData.users[0]

    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            title: user.title,
            bio: "Product designer with over 5 years of experience.",
            phone: "+1 234 567 8900",
            avatar: user.avatar,
        },
    })

    function onSubmit(data: AccountFormValues) {
        console.log(data)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                        Update your personal information and profile settings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex items-center gap-x-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>
                                        {user.name.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <Button variant="outline" size="sm">
                                        Change Avatar
                                    </Button>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        JPG, GIF or PNG. Max size of 3MB.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Job Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="tel" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                className="resize-none"
                                                rows={4}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Brief description for your profile.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div>
                                <h4 className="text-sm font-medium mb-4">Skills & Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary">
                                            {skill}
                                        </Badge>
                                    ))}
                                    <Button variant="outline" size="sm">
                                        Add Skill
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                        Change your password or enable two-factor authentication.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Input type="password" placeholder="Current password" />
                        <Input type="password" placeholder="New password" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Password must be at least 8 characters long and include a number.
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Update Password</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sessions</CardTitle>
                    <CardDescription>
                        Manage your active sessions and connected devices.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                device: "MacBook Pro",
                                location: "San Francisco, CA",
                                lastActive: "Now",
                                browser: "Chrome",
                            },
                            {
                                device: "iPhone 12",
                                location: "New York, NY",
                                lastActive: "2 hours ago",
                                browser: "Safari",
                            },
                        ].map((session, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 border rounded-lg"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium">{session.device}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {session.location} · {session.browser}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Last active: {session.lastActive}
                                    </p>
                                </div>
                                <Button variant="ghost" className="text-red-600">
                                    Sign Out
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}