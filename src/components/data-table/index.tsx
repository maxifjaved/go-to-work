import React, { useState, useMemo, CSSProperties } from 'react';
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
import { Clock, GripHorizontal, GripVertical } from 'lucide-react';
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import {mockData} from "@/components/data-table/data";

const RowDragHandle = ({ rowId }) => {
    const { attributes, listeners } = useSortable({
        id: rowId,
    });
    return (
        <button className="cursor-move p-2" {...attributes} {...listeners}>
            <GripVertical className="h-4 w-4" />
        </button>
    );
};

const DraggableTableHeader = ({ header }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
        id: header.column.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition: 'transform 0.2s ease-in-out',
    };

    return (
        <TableHead ref={setNodeRef} style={style} className={`select-none ${isDragging ? 'opacity-50' : ''}`}>
            <div className="flex items-center justify-between gap-2">
                {header.isPlaceholder ? null : (
                    <div className="flex-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                )}
                {header.column.id !== 'drag-handle' && (
                    <button className="cursor-move opacity-50 hover:opacity-100" {...attributes} {...listeners}>
                        <GripHorizontal className="h-4 w-4" />
                    </button>
                )}
            </div>
        </TableHead>
    );
};

const DraggableRow = ({ row }) => {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id.toString(),
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow ref={setNodeRef} style={style} className={isDragging ? 'opacity-50' : ''}>
            {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    );
};

const TaskListDnD = () => {
    const [data, setData] = useState(() => mockData.tasks.slice(0, 20));
    const [columnOrder, setColumnOrder] = useState([]);

    const dataIds = useMemo(
        () => data.map(item => item.id.toString()),
        [data]
    );

    const columnHelper = createColumnHelper();

    const getPriorityColor = (priority) => ({
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-orange-100 text-orange-800',
        Urgent: 'bg-red-100 text-red-800'
    }[priority] || 'bg-gray-100 text-gray-800');

    const columns = useMemo(() => [
        columnHelper.accessor(() => null, {
            id: 'drag-handle',
            header: '',
            size: 50,
            cell: ({ row }) => <RowDragHandle rowId={row.original.id.toString()} />,
        }),
        columnHelper.accessor('key', {
            id: 'key',
            header: 'ID',
        }),
        columnHelper.accessor('title', {
            id: 'title',
            header: 'Title',
        }),
        columnHelper.accessor('priority', {
            id: 'priority',
            header: 'Priority',
            cell: info => (
                <Badge className={getPriorityColor(info.getValue())}>
                    {info.getValue()}
                </Badge>
            ),
        }),
        columnHelper.accessor('status', {
            id: 'status',
            header: 'Status',
            cell: info => (
                <Badge variant="outline">
                    {info.getValue()}
                </Badge>
            ),
        }),
        columnHelper.accessor('assigneeName', {
            id: 'assignee',
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
            id: 'dueDate',
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
        state: {
            columnOrder,
        },
        onColumnOrderChange: setColumnOrder,
        getRowId: row => row.id.toString(),
    });

    React.useEffect(() => {
        const initialOrder = columns.map(c => c.id).filter(id => id !== 'drag-handle');
        setColumnOrder(['drag-handle', ...initialOrder]);
    }, [columns]);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor)
    );

    const handleColumnDragEnd = (event) => {
        const { active, over } = event;
        if (!active || !over || active.id === over.id || active.id === 'drag-handle') return;

        setColumnOrder(prevOrder => {
            const oldIndex = prevOrder.indexOf(active.id);
            const newIndex = prevOrder.indexOf(over.id);
            const newOrder = arrayMove(prevOrder, oldIndex, newIndex);
            const dragHandleIndex = newOrder.indexOf('drag-handle');
            if (dragHandleIndex > 0) {
                newOrder.splice(dragHandleIndex, 1);
                newOrder.unshift('drag-handle');
            }
            return newOrder;
        });
    };

    const handleRowDragEnd = (event) => {
        const { active, over } = event;
        if (!active || !over || active.id === over.id) return;

        setData(prevData => {
            const oldIndex = prevData.findIndex(item => item.id.toString() === active.id);
            const newIndex = prevData.findIndex(item => item.id.toString() === over.id);
            return arrayMove(prevData, oldIndex, newIndex);
        });
    };

    return (
        <div className="rounded-md border">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToHorizontalAxis]}
                onDragEnd={handleColumnDragEnd}
            >
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                <SortableContext
                                    items={columnOrder}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    {headerGroup.headers.map(header => (
                                        <DraggableTableHeader key={header.id} header={header} />
                                    ))}
                                </SortableContext>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={handleRowDragEnd}
                    >
                        <TableBody>
                            <SortableContext
                                items={dataIds}
                                strategy={verticalListSortingStrategy}
                            >
                                {table.getRowModel().rows.map(row => (
                                    <DraggableRow key={row.id} row={row} />
                                ))}
                            </SortableContext>
                        </TableBody>
                    </DndContext>
                </Table>
            </DndContext>
        </div>
    );
};

export default TaskListDnD;