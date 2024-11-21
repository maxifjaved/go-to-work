"use client"

import {useState} from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Switch} from "@/components/ui/switch"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {MoreHorizontal, Plus, Search, Shield,} from "lucide-react"
import {mockData} from "@/components/data-table/data";

// Role definitions with permissions
const roles = {
    owner: {
        name: "Owner",
        description: "Full access to all resources and settings",
        permissions: ["manage_team", "manage_projects", "manage_settings", "manage_billing"],
    },
    admin: {
        name: "Admin",
        description: "Can manage most settings and all projects",
        permissions: ["manage_team", "manage_projects", "manage_settings"],
    },
    manager: {
        name: "Manager",
        description: "Can manage projects and team members",
        permissions: ["manage_projects", "view_team"],
    },
    member: {
        name: "Member",
        description: "Can view and work on assigned projects",
        permissions: ["view_projects", "view_team"],
    },
}

export function TeamsAndAccessSettings() {
    const [showInviteDialog, setShowInviteDialog] = useState(false)
    const [showRoleDialog, setShowRoleDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const users = mockData.users
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Team Overview Card */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Team Overview</CardTitle>
                            <CardDescription>
                                Current team members and their roles
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowRoleDialog(true)}
                            >
                                <Shield className="mr-2 h-4 w-4"/>
                                Manage Roles
                            </Button>
                            <Button onClick={() => setShowInviteDialog(true)}>
                                <Plus className="mr-2 h-4 w-4"/>
                                Add Member
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex items-center gap-2">
                        <Search className="h-4 w-4 text-muted-foreground"/>
                        <Input
                            placeholder="Search members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Active</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar}/>
                                                <AvatarFallback>
                                                    {user.name.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.department}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.status === "Active" ? "default" : "secondary"}
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.lastActive}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSelectedUser(user)
                                                        setShowRoleDialog(true)
                                                    }}
                                                >
                                                    Change Role
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem className="text-red-600">
                                                    Remove from Team
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Invite Member Dialog */}
            <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Invite Team Member</DialogTitle>
                        <DialogDescription>
                            Send an invitation to join your team.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter email address"/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(roles).map(([key, role]) => (
                                        <SelectItem key={key} value={key}>
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="department">Department</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select department"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="development">Development</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="marketing">Marketing</SelectItem>
                                    <SelectItem value="product">Product</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setShowInviteDialog(false)}>
                            Send Invitation
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Role Management Dialog */}
            <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedUser ? "Change Role" : "Manage Roles"}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedUser
                                ? `Update role and permissions for ${selectedUser.name}`
                                : "Configure roles and permissions for your team"
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        {selectedUser ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={selectedUser.avatar}/>
                                        <AvatarFallback>
                                            {selectedUser.name.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{selectedUser.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {selectedUser.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder={selectedUser.role}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(roles).map(([key, role]) => (
                                                <SelectItem key={key} value={key}>
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {Object.entries(roles).map(([key, role]) => (
                                    <Card key={key}>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-base">
                                                    {role.name}
                                                </CardTitle>
                                            </div>
                                            <CardDescription>
                                                {role.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <Label>Permissions</Label>
                                                <div className="grid gap-2">
                                                    {role.permissions.map((permission) => (
                                                        <div
                                                            key={permission}
                                                            className="flex items-center justify-between"
                                                        >
                              <span className="text-sm">
                                {permission.split("_").map(word =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(" ")}
                              </span>
                                                            <Switch checked={true}/>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => {
                            setShowRoleDialog(false)
                            setSelectedUser(null)
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            setShowRoleDialog(false)
                            setSelectedUser(null)
                        }}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Access Logs Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Access Logs</CardTitle>
                    <CardDescription>
                        Recent team access and permission changes
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                {
                                    user: users[0],
                                    action: "Role Changed",
                                    details: "Changed from Member to Admin",
                                    date: "2 hours ago",
                                },
                                {
                                    user: users[1],
                                    action: "Member Added",
                                    details: "Invited by Admin",
                                    date: "1 day ago",
                                },
                                {
                                    user: users[2],
                                    action: "Permissions Updated",
                                    details: "Added project management access",
                                    date: "3 days ago",
                                },
                            ].map((log, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={log.user.avatar}/>
                                                <AvatarFallback>
                                                    {log.user.name.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{log.user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{log.action}</TableCell>
                                    <TableCell>{log.details}</TableCell>
                                    <TableCell>{log.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full">
                        View All Logs
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}