"use client"

import { useTasks } from "./tasks-context"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { X } from "lucide-react"
import {mockData} from "@/components/data-table/data";

export function TasksBulkActions() {
    const { selectedTasks, setSelectedTasks } = useTasks()

    if (selectedTasks.length === 0) return null

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background border rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {selectedTasks.length} tasks selected
        </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTasks([])}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change Priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Assign To" />
                </SelectTrigger>
                <SelectContent>
                    {mockData.users.map(user => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                            {user.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                    // Handle bulk delete
                    console.log('Delete tasks:', selectedTasks)
                    setSelectedTasks([])
                }}
            >
                Delete
            </Button>
        </div>
    )
}