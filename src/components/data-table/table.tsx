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
import { User } from "./columns";
import { useCallback, useMemo, useState } from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    TouchSensor,
    closestCenter,
    DragEndEvent,
    DragStartEvent,
    type UniqueIdentifier,
    DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { ColumnManager } from "./components/column-manager";
import { DragPreview } from "./components/drag-preview";
import { DraggableRow } from "./components/draggable-row";
import { SortableHeader } from "./components/sortable-header";

interface DataTableProps<TValue> {
    columns: ColumnDef<User, TValue>[];
    data: User[];
    onRowOrderChange?: (newData: User[]) => void;
}

export function DataTable<TValue>({
                                      columns,
                                      data,
                                      onRowOrderChange,
                                  }: DataTableProps<TValue>) {
    const [colSizing, setColSizing] = useState<ColumnSizingState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnOrder, setColumnOrder] = useState<string[]>(() =>
        columns.map(c => c.id!)
    );
    const [activeHeader, setActiveHeader] = useState<Header<User, unknown> | null>(null);

    const dataIds = useMemo<UniqueIdentifier[]>(
        () => data.map(item => item.id.toString()),
        [data]
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor)
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
        getRowId: row => row.id.toString(),
        state: {
            columnSizing: colSizing,
            sorting,
            columnVisibility,
            columnOrder,
        },
    });

    const handleHeaderDragStart = useCallback((event: DragStartEvent) => {
        const { active } = event;
        const header = table.getHeaderGroups()[0].headers.find(
            (h) => h.id === active.id
        );
        if (header) {
            setActiveHeader(header);
            document.body.style.cursor = 'grabbing';
        }
    }, [table]);

    const handleHeaderDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        setActiveHeader(null);
        document.body.style.cursor = '';

        if (!over || active.id === over.id) return;

        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);

        setColumnOrder(prevOrder => arrayMove(prevOrder, oldIndex, newIndex));
    }, [columnOrder]);

    const handleRowDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);

        const newData = arrayMove([...data], oldIndex, newIndex);
        onRowOrderChange?.(newData);
    }, [data, dataIds, onRowOrderChange]);

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
                                onDragStart={handleHeaderDragStart}
                                onDragEnd={handleHeaderDragEnd}
                                modifiers={[restrictToHorizontalAxis]}
                            >
                                <SortableContext
                                    items={columnOrder}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    <TableRow>
                                        <TableCell className="w-[50px]" />
                                        {headerGroup.headers.map((header) => (
                                            <SortableHeader
                                                key={header.id}
                                                header={header}
                                                table={table}
                                            />
                                        ))}
                                    </TableRow>
                                </SortableContext>
                                <DragOverlay>
                                    {activeHeader ? (
                                        <DragPreview header={activeHeader} />
                                    ) : null}
                                </DragOverlay>
                            </DndContext>
                        ))}
                    </TableHeader>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleRowDragEnd}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <TableBody>
                            <SortableContext
                                items={dataIds}
                                strategy={verticalListSortingStrategy}
                            >
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <DraggableRow
                                            key={row.id}
                                            row={row}
                                        />
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length + 1}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </SortableContext>
                        </TableBody>
                    </DndContext>
                </Table>
            </div>
        </div>
    );
}