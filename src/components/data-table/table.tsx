import {
    ColumnDef,
    ColumnSizingState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    Header,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {User} from "./columns";
import {useState} from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    closestCenter,
    DragEndEvent,
    DragStartEvent, DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import {restrictToHorizontalAxis} from '@dnd-kit/modifiers';
import {ColumnManager} from "./components/column-manager";
import {SortableHeader} from "./components/sortable-header";
import {DragPreview} from "./components/drag-preview";

interface DataTableProps<TValue> {
    columns: ColumnDef<User, TValue>[];
    data: User[];
}

export function DataTable<TValue>({columns, data}: DataTableProps<TValue>) {
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
        const {active} = event;
        const header = table.getHeaderGroups()[0].headers.find(
            (h) => h.id === active.id
        );
        if (header) {
            setActiveHeader(header);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

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
                <ColumnManager table={table}/>
            </div>

            <div className="rounded-md border">
                <Table style={{width: table.getTotalSize()}}>
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
                                        <DragPreview header={activeHeader}/>
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