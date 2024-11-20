import {
    ColumnDef,
    ColumnSizingState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    Table as TableInstance,
    Header,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { User } from "./columns";
import { ColumnResizer } from "./column-resizer";
import { useState } from "react";
import { ArrowUpDown, ChevronDown, ChevronUp, GripHorizontal, Settings2 } from "lucide-react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    closestCenter,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    useSortable,
    arrayMove,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { CSS } from "@dnd-kit/utilities";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DragPreviewProps {
    header: Header<User, unknown>;
}

const DragPreview = ({ header }: DragPreviewProps) => {
    return (
        <div
            className="rounded border bg-background px-4 py-2 shadow-lg"
            style={{
                width: header.getSize(),
                maxWidth: "300px",
            }}
        >
            <div className="flex items-center gap-2">
                <GripHorizontal className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                </span>
            </div>
        </div>
    );
};

interface SortableHeaderProps {
    header: Header<User, unknown>;
    table: TableInstance<User>;
}

const SortableHeader = ({ header }: SortableHeaderProps) => {
    const {
        attributes,
        listeners,
        isDragging,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: header.id,
    });

    const isSortable = header.column.getCanSort();
    const width = header.getSize();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        width,
        opacity: isDragging ? 0.4 : 1,
    };

    return (
        <TableHead
            ref={setNodeRef}
            style={style}
            className={cn(
                "relative",
                isDragging && "z-50"
            )}
        >
            <div className="flex items-center gap-2">
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab touch-none p-1 rounded hover:bg-accent"
                >
                    <GripHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
                <div
                    className={cn(
                        "flex items-center gap-2 flex-grow",
                        isSortable && "cursor-pointer select-none"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                >
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                    {isSortable && (
                        <span className="ml-1">
                            {header.column.getIsSorted() ? (
                                header.column.getIsSorted() === "asc" ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )
                            ) : (
                                <ArrowUpDown className="h-4 w-4 text-gray-400" />
                            )}
                        </span>
                    )}
                </div>
            </div>
            <ColumnResizer header={header} />
        </TableHead>
    );
};

interface DataTableProps<TValue> {
    columns: ColumnDef<User, TValue>[];
    data: User[];
}

export function DataTable<TValue>({ columns, data }: DataTableProps<TValue>) {
    const [colSizing, setColSizing] = useState<ColumnSizingState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnOrder, setColumnOrder] = useState<string[]>([]);
    const [activeHeader, setActiveHeader] = useState<Header<User, unknown> | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
                delay: 100,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: (event, args) => {
                const header = args.context.active?.data.current?.header as Header<User, unknown>;
                return {
                    x: header ? header.getSize() / 2 : 0,
                    y: 0,
                };
            },
        })
    );

    const table = useReactTable({
        data,
        columns,
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnSizingChange: setColSizing,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        state: {
            columnSizing: colSizing,
            sorting,
            columnVisibility,
            columnOrder,
        },
    });

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const header = table.getHeaderGroups()[0].headers.find(
            (h) => h.id === active.id
        );
        if (header) {
            setActiveHeader(header);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveHeader(null);

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = table.getAllLeafColumns().findIndex(
            (col) => col.id === active.id
        );
        const newIndex = table.getAllLeafColumns().findIndex(
            (col) => col.id === over.id
        );

        const newOrder = arrayMove(
            table.getAllLeafColumns().map((col) => col.id),
            oldIndex,
            newIndex
        );

        setColumnOrder(newOrder);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="ml-auto">
                            <Settings2 className="mr-2 h-4 w-4" />
                            View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[150px]">
                        {table.getAllColumns().map((column) => {
                            if (!column.getCanHide()) return null;
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                <Table style={{ width: table.getTotalSize() }}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <DndContext
                                key={headerGroup.id}
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                modifiers={[restrictToHorizontalAxis]}
                            >
                                <SortableContext
                                    items={headerGroup.headers.map((h) => h.id)}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    <TableRow>
                                        {headerGroup.headers.map((header) => (
                                            <SortableHeader
                                                key={header.id}
                                                header={header}
                                                table={table}
                                            />
                                        ))}
                                    </TableRow>
                                </SortableContext>
                                <DragOverlay dropAnimation={{
                                    duration: 150,
                                    easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                                }}>
                                    {activeHeader ? (
                                        <DragPreview header={activeHeader} />
                                    ) : null}
                                </DragOverlay>
                            </DndContext>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            style={{
                                                width: cell.column.getSize(),
                                                minWidth: cell.column.columnDef.minSize,
                                                maxWidth: cell.column.columnDef.maxSize,
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}