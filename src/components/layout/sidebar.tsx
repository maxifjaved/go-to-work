import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Users,
    BarChart3,
    Settings,
    LogOut,
    PlusCircle,
    ChevronDown,
    ChevronRight,
    X,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {mockData} from "@/components/data-table/data";

interface SidebarProps {
    isOpen: boolean
    isMobile: boolean
    onClose: () => void
}

export function Sidebar({ isOpen, isMobile, onClose }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [openSections, setOpenSections] = useState<string[]>(["projects"])

    const toggleSection = (section: string) => {
        setOpenSections(current =>
            current.includes(section)
                ? current.filter(s => s !== section)
                : [...current, section]
        )
    }

    const mainNav = [
        {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            badge: null,
        },
        {
            title: "Projects",
            href: "/projects",
            icon: FolderKanban,
            badge: mockData.projects.length.toString(),
        },
        {
            title: "Tasks",
            href: "/tasks",
            icon: CheckSquare,
            badge: mockData.tasks.filter(t => t.assigneeId === mockData.users[0].id).length.toString(),
        },
        {
            title: "Team",
            href: "/team",
            icon: Users,
            badge: null,
        },
        {
            title: "Reports",
            href: "/reports",
            icon: BarChart3,
            badge: null,
        },
        {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            badge: null,
        },
    ]

    const handleNewProject = () => {
        router.push("/projects/new")
    }

    const handleLogout = () => {
        // Implement logout logic
        router.push("/login")
    }

    const sidebarContent = (
        <>
            <div className="flex h-16 items-center border-b px-6">
                {isMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden absolute right-4"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6" />
                    </Button>
                )}
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-xl">🚀</span>
                    {isOpen && <span>Go To Work</span>}
                </Link>
            </div>

            <ScrollArea className="h-[calc(100vh-4rem)] pb-6">
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <div className="flex items-center gap-x-3">
                            {isOpen ? (
                                <Button className="w-full justify-start" onClick={handleNewProject}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    New Project
                                </Button>
                            ) : (
                                <Button size="icon" className="w-full" onClick={handleNewProject}>
                                    <PlusCircle className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="px-3 py-2">
                        <nav className="space-y-1">
                            {mainNav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                        pathname === item.href
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {isOpen && (
                                        <span className="flex-1">
                                            {item.title}
                                            {item.badge && (
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-auto"
                                                >
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {isOpen && (
                        <>
                            <div className="px-3 py-2">
                                <div className="space-y-1">
                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                        Recent Projects
                                    </h2>
                                    <Collapsible
                                        open={openSections.includes("projects")}
                                        onOpenChange={() => toggleSection("projects")}
                                    >
                                        <CollapsibleTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-between"
                                            >
                                                <span>Projects</span>
                                                {openSections.includes("projects") ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="space-y-1">
                                            {mockData.projects.slice(0, 5).map((project) => (
                                                <Link
                                                    key={project.id}
                                                    href={`/projects/${project.id}`}
                                                    className="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                                >
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={`https://avatar.vercel.sh/${project.name}.png`} />
                                                        <AvatarFallback>
                                                            {project.name.slice(0, 2).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            {project.name}
                                                        </p>
                                                        <Progress
                                                            value={(project.completedTasksCount / project.tasksCount) * 100}
                                                            className="h-1"
                                                        />
                                                    </div>
                                                </Link>
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                            </div>

                            <div className="px-3 py-2">
                                <div className="space-y-1">
                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                        Team Members
                                    </h2>
                                    <Collapsible
                                        open={openSections.includes("team")}
                                        onOpenChange={() => toggleSection("team")}
                                    >
                                        <CollapsibleTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-between"
                                            >
                                                <span>Team</span>
                                                {openSections.includes("team") ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="space-y-1">
                                            {mockData.users.slice(0, 5).map((user) => (
                                                <Link
                                                    key={user.id}
                                                    href={`/team/${user.id}`}
                                                    className="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                                >
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={user.avatar} />
                                                        <AvatarFallback>
                                                            {user.name.slice(0, 2).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-1 items-center justify-between">
                                                        <span>{user.name}</span>
                                                        <Badge
                                                            variant={user.status === "Active" ? "default" : "secondary"}
                                                            className="ml-auto"
                                                        >
                                                            {user.status}
                                                        </Badge>
                                                    </div>
                                                </Link>
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="px-3 py-2">
                        {isOpen ? (
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={handleLogout}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Log Out
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-full"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </ScrollArea>
        </>
    )

    return (
        <>
            {isMobile ? (
                <div
                    className={cn(
                        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden",
                        isOpen ? "block" : "hidden"
                    )}
                >
                    <div className={cn(
                        "fixed inset-y-0 left-0 z-50 h-full w-64 bg-background shadow-lg transition-transform duration-300 ease-in-out",
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    )}>
                        {sidebarContent}
                    </div>
                </div>
            ) : (
                <div className={cn(
                    "fixed inset-y-0 left-0 z-50 h-full bg-background transition-all duration-300 ease-in-out",
                    isOpen ? "w-64" : "w-20",
                    "border-r"
                )}>
                    {sidebarContent}
                </div>
            )}
        </>
    )
}