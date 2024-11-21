"use client"

import { useMemo } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { useTasks } from "./tasks-context"
import {cn} from "@/lib/utils";
import {mockData} from "@/components/data-table/data";

export function TasksList() {
    const {
        filters,
        searchQuery,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        selectedTasks,
        setSelectedTasks,
    } = useTasks()

    const tasks = useMemo(() => {
        let filteredTasks = [...mockData.tasks]

        // Apply filters
        if (searchQuery) {
            filteredTasks = filteredTasks.filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        if (filters.status.length) {
            filteredTasks = filteredTasks.filter(task =>
                filters.status.includes(task.status)
            )
        }

        if (filters.priority.length) {
            filteredTasks = filteredTasks.filter(task =>
                filters.priority.includes(task.priority)
            )
        }

        if (filters.assignee.length) {
            filteredTasks = filteredTasks.filter(task =>
                filters.assignee.includes(task.assigneeId.toString())
            )
        }

        if (filters.project.length) {
            filteredTasks = filteredTasks.filter(task =>
                filters.project.includes(task.projectId.toString())
            )
        }

        // Apply sorting
        filteredTasks.sort((a, b) => {
            let comparison = 0
            switch (sortBy) {
                case "priority":
                    comparison = a.priorityOrder - b.priorityOrder
                    break
                case "dueDate":
                    comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                    break
                case "status":
                    comparison = a.statusOrder - b.statusOrder
                    break
                case "assignee":
                    comparison = (a.assigneeName || "").localeCompare(b.assigneeName || "")
                    break
            }
            return sortDirection === "asc" ? comparison : -comparison
        })

        return filteredTasks
    }, [mockData.tasks, filters, searchQuery, sortBy, sortDirection])

    const toggleSort = (key: typeof sortBy) => {
        if (sortBy === key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortBy(key)
            setSortDirection("asc")
        }
    }

    const toggleTaskSelection = (taskId: string) => {
        if (selectedTasks.includes(taskId)) {
            setSelectedTasks(selectedTasks.filter(id => id !== taskId))
        } else {
            setSelectedTasks([...selectedTasks, taskId])
        }
    }

    const toggleAllTasks = () => {
        if (selectedTasks.length === tasks.length) {
            setSelectedTasks([])
        } else {
            setSelectedTasks(tasks.map(task => task.id.toString()))
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40px]">
                            <Checkbox
                                checked={selectedTasks.length === tasks.length}
                                onCheckedChange={toggleAllTasks}
                            />
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => toggleSort("title")}>
                                Task
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => toggleSort("priority")}>
                                Priority
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => toggleSort("status")}>
                                Status
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => toggleSort("assignee")}>
                                Assignee
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => toggleSort("dueDate")}>
                                Due Date
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => {
                        const assignee = mockData.users.find(user => user.id === task.assigneeId)
                        const project = mockData.projects.find(project => project.id === task.projectId)
                        const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Done'
                        const progress = (task.completedSubTasksCount / task.subTasksCount) * 100 || 0

                        return (
                            <TableRow key={task.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedTasks.includes(task.id.toString())}
                                        onCheckedChange={() => toggleTaskSelection(task.id.toString())}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{task.title}</span>
                                        <span className="text-xs text-muted-foreground">
                        {project?.name} • {task.key}
                      </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={task.priority === 'Urgent' ? 'destructive' : 'secondary'}
                                        className={cn(
                                            task.priority === 'High' && 'bg-orange-100 text-orange-700',
                                            task.priority === 'Medium' && 'bg-blue-100 text-blue-700',
                                            task.priority === 'Low' && 'bg-slate-100 text-slate-700'
                                        )}
                                    >
                                        {task.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            task.status === 'In Progress' && 'border-blue-500 text-blue-500',
                                            task.status === 'Done' && 'border-green-500 text-green-500',
                                            task.status === 'Todo' && 'border-slate-500 text-slate-500',
                                            task.status === 'In Review' && 'border-purple-500 text-purple-500',
                                            task.status === 'Backlog' && 'border-gray-500 text-gray-500'
                                        )}
                                    >
                                        {task.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {assignee && (
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={assignee.avatar} />
                                                <AvatarFallback>
                                                    {assignee.name.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{assignee.name}</span>
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                      <span className={cn(
                          "text-sm",
                          isOverdue && "text-red-500"
                      )}>
                        {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
                      </span>
                                        {isOverdue && (
                                            <Badge variant="destructive" className="text-xs">
                                                Overdue
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Progress value={progress} className="w-[60px]" />
                                        <span className="text-sm text-muted-foreground">
                        {Math.round(progress)}%
                      </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                                            <DropdownMenuItem>Assign To</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                                Delete Task
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}