import React, { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock } from 'lucide-react';
import { mockData } from "@/components/data-table/data";

const TaskList = () => {
    const [data] = useState(() => mockData.tasks.slice(0, 20));
    const columnHelper = createColumnHelper();

    // @ts-expect-error - priority is a string
    const getPriorityColor = (priority) => ({
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-orange-100 text-orange-800',
        Urgent: 'bg-red-100 text-red-800'
    }[priority] || 'bg-gray-100 text-gray-800');

    const columns = useMemo(() => [
        columnHelper.accessor('key', {
            header: 'ID',
        }),
        columnHelper.accessor('title', {
            header: 'Title',
        }),
        columnHelper.accessor('priority', {
            header: 'Priority',
            cell: info => (
                <Badge className={getPriorityColor(info.getValue())}>
                    {info.getValue()}
                </Badge>
            ),
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: info => (
                <Badge variant="outline">
                    {info.getValue()}
                </Badge>
            ),
        }),
        columnHelper.accessor('assigneeName', {
            header: 'Assignee',
            cell: info => (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={info.row.original.assigneeAvatar} />
                        <AvatarFallback>{info.getValue()?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{info.getValue()}</span>
                </div>
            ),
        }),
        columnHelper.accessor('dueDate', {
            header: 'Due Date',
            cell: info => (
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(info.getValue()).toLocaleDateString()}</span>
                </div>
            ),
        }),
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        flexRender(header.column.columnDef.header, header.getContext())
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TaskList;