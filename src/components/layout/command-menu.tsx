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
    Settings,
    User,
    PlusCircle,
    Search,
    FileText,
    Users,
    BarChart,
    FolderKanban
} from "lucide-react"
import { useRouter } from "next/navigation"
import { mockData } from "@/components/data-table/data"

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
                    <CommandItem onSelect={() => {
                        router.push("/projects/new")
                        onOpenChange(false)
                    }}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Project
                    </CommandItem>
                    <CommandItem onSelect={() => {
                        router.push("/tasks/new")
                        onOpenChange(false)
                    }}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Task
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Navigation">
                    <CommandItem onSelect={() => {
                        router.push("/")
                        onOpenChange(false)
                    }}>
                        <Search className="mr-2 h-4 w-4" />
                        Dashboard
                    </CommandItem>
                    <CommandItem onSelect={() => {
                        router.push("/projects")
                        onOpenChange(false)
                    }}>
                        <FolderKanban className="mr-2 h-4 w-4" />
                        Projects
                    </CommandItem>
                    <CommandItem onSelect={() => {
                        router.push("/tasks")
                        onOpenChange(false)
                    }}>
                        <FileText className="mr-2 h-4 w-4" />
                        Tasks
                    </CommandItem>
                    <CommandItem onSelect={() => {
                        router.push("/team")
                        onOpenChange(false)
                    }}>
                        <Users className="mr-2 h-4 w-4" />
                        Team
                    </CommandItem>
                    <CommandItem onSelect={() => {
                        router.push("/reports")
                        onOpenChange(false)
                    }}>
                        <BarChart className="mr-2 h-4 w-4" />
                        Reports
                    </CommandItem>
                    <CommandItem onSelect={() => {
                        router.push("/settings")
                        onOpenChange(false)
                    }}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Recent Projects">
                    {mockData.projects.slice(0, 5).map((project) => (
                        <CommandItem
                            key={project.id}
                            onSelect={() => {
                                router.push(`/projects/${project.id}`)
                                onOpenChange(false)
                            }}
                        >
                            <Search className="mr-2 h-4 w-4" />
                            {project.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Team Members">
                    {mockData.users.slice(0, 5).map((user) => (
                        <CommandItem
                            key={user.id}
                            onSelect={() => {
                                router.push(`/team/${user.id}`)
                                onOpenChange(false)
                            }}
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