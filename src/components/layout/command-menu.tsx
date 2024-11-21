"use client"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    PlusCircle,
    Search,
} from "lucide-react"
import { useRouter } from "next/navigation"
import {mockData} from "@/components/data-table/data";

export function CommandMenu({
                                open,
                                onOpenChange,
                            }: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const router = useRouter()

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Quick Actions">
                    <CommandItem onSelect={() => router.push("/projects/new")}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Project
                    </CommandItem>
                    <CommandItem onSelect={() => router.push("/tasks/new")}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Task
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Projects">
                    {mockData.projects.slice(0, 5).map((project) => (
                        <CommandItem
                            key={project.id}
                            onSelect={() => router.push(`/projects/${project.id}`)}
                        >
                            <Search className="mr-2 h-4 w-4" />
                            {project.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Team">
                    {mockData.users.slice(0, 5).map((user) => (
                        <CommandItem
                            key={user.id}
                            onSelect={() => router.push(`/team/${user.id}`)}
                        >
                            <User className="mr-2 h-4 w-4" />
                            {user.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}