"use client"

import { useMemo } from "react"
import { mockData } from "@/components/data-table/data"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DownloadCloud,
    File,
    FileText,
    Image,
    MoreHorizontal,
    Plus,
    Upload,
    FileCode,
    FileIcon,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProjectFilesProps {
    projectId: string
}

const fileIcons: Record<string, any> = {
    'image/jpeg': Image,
    'image/png': Image,
    'application/pdf': FileText,
    'application/zip': FileIcon,
    'text/plain': File,
    'text/code': FileCode,
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function ProjectFiles({ projectId }: ProjectFilesProps) {
    const project = useMemo(() =>
            mockData.projects.find(p => p.id.toString() === projectId),
        [projectId]
    )

    const files = useMemo(() => {
        if (!project) return []

        return mockData.tasks
            .filter(task => task.projectId === project.id)
            .flatMap(task => task.attachments)
            .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    }, [project])

    if (!project) return null

    const totalStorage = 1024 * 1024 * 1024 // 1GB
    const usedStorage = files.reduce((acc, file) => acc + file.size, 0)
    const storagePercentage = (usedStorage / totalStorage) * 100

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Storage</CardTitle>
                        <Button>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Files
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
              <span>
                {formatFileSize(usedStorage)} of {formatFileSize(totalStorage)} used
              </span>
                            <span className="text-muted-foreground">
                {storagePercentage.toFixed(1)}%
              </span>
                        </div>
                        <Progress value={storagePercentage} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Files</CardTitle>
                        <div className="flex items-center gap-2">
                            <Button variant="outline">
                                <Plus className="mr-2 h-4 w-4" />
                                New Folder
                            </Button>
                            <Button>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Files
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[400px]">Name</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Last Modified</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {files.map((file) => {
                                const FileIcon = fileIcons[file.type] || File
                                const user = mockData.users.find(u => u.id === file.uploadedBy)

                                return (
                                    <TableRow key={file.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <FileIcon className="h-4 w-4" />
                                                {file.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {user?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {formatDistanceToNow(new Date(file.uploadedAt), {
                                                addSuffix: true,
                                            })}
                                        </TableCell>
                                        <TableCell>{formatFileSize(file.size)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <DownloadCloud className="h-4 w-4" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            Download
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            Share
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            Move
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            Rename
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}