"use client"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PlusCircle, Users } from "lucide-react"
import { useState } from "react"
import {InviteMemberDialog} from "./invite-member-dialog";

export function TeamHeader() {
    const [showInviteDialog, setShowInviteDialog] = useState(false)
    const [view, setView] = useState<"grid" | "list">("grid")
    const [departmentFilter, setDepartmentFilter] = useState<string>("all")

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Team</h1>
                <p className="text-muted-foreground">
                    Manage team members and their roles
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setView(view === "grid" ? "list" : "grid")}
                >
                    <Users className="h-4 w-4" />
                </Button>
                <Button onClick={() => setShowInviteDialog(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Member
                </Button>
            </div>
            <InviteMemberDialog
                open={showInviteDialog}
                onOpenChange={setShowInviteDialog}
            />
        </div>
    )
}