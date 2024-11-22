import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    MoreVertical,
    Edit,
    Trash,
    Archive,
    Share2,
    Copy,
    Settings,
    Download,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface ProjectActionsMenuProps {
    projectId: string
}

export function ProjectActionsMenu({ projectId }: ProjectActionsMenuProps) {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push(`/projects/${projectId}/edit`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/projects/${projectId}/settings`)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive Project
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Project
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}