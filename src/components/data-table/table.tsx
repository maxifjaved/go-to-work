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
    Row,
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
    DragStartEvent,
    DragOverlay, defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import {restrictToHorizontalAxis, restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {ColumnManager} from "./components/column-manager";
import {SortableHeader} from "./components/sortable-header";
import {DragPreview} from "./components/drag-preview";
import {SortableRow} from "./components/sortable-row";
import {GripVertical} from "lucide-react";

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
    const [columnOrder, setColumnOrder] = useState<string[]>([]);
    const [activeHeader, setActiveHeader] = useState<Header<User, unknown> | null>(null);
    const [activeRow, setActiveRow] = useState<Row<User> | null>(null);
    const [rows, setRows] = useState(data);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor)
    );

    const table = useReactTable({
        data: rows,
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

    const handleHeaderDragStart = (event: DragStartEvent) => {
        const {active} = event;
        const header = table.getHeaderGroups()[0].headers.find(
            (h) => h.id === active.id
        );
        if (header) {
            setActiveHeader(header);
        }
    };

    const handleHeaderDragEnd = (event: DragEndEvent) => {
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

    const handleRowDragStart = (event: DragStartEvent) => {
        const {active} = event;
        const row = table.getRowModel().rows.find((r) => r.id === active.id);
        if (row) {
            setActiveRow(row);
        }
    };

    const handleRowDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (!over || active.id === over.id) {
            setActiveRow(null);
            return;
        }

        const rowsMap = table.getRowModel().rows.reduce((acc, row, index) => {
            acc[row.id] = index;
            return acc;
        }, {} as { [key: string]: number });

        const oldIndex = rowsMap[active.id.toString()];
        const newIndex = rowsMap[over.id.toString()];

        if (oldIndex !== undefined && newIndex !== undefined) {
            const newRows = arrayMove([...rows], oldIndex, newIndex);
            setActiveRow(null);
            setRows(newRows);
            onRowOrderChange?.(newRows);
        }
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
                                onDragStart={handleHeaderDragStart}
                                onDragEnd={handleHeaderDragEnd}
                                modifiers={[restrictToHorizontalAxis]}
                            >
                                <SortableContext
                                    items={headerGroup.headers.map((h) => h.id)}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    <TableRow>
                                        <TableCell className="w-[50px]"/>
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
                                        <DragPreview header={activeHeader}/>
                                    ) : null}
                                </DragOverlay>
                            </DndContext>
                        ))}
                    </TableHeader>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleRowDragStart}
                        onDragEnd={handleRowDragEnd}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <TableBody>
                            <SortableContext
                                items={table.getRowModel().rows.map((row) => row.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <SortableRow
                                            key={row.id}
                                            row={row}
                                            columns={columns.length}
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
                            <DragOverlay dropAnimation={{
                                duration: 200,
                                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                                sideEffects: defaultDropAnimationSideEffects({
                                    styles: {
                                        active: {
                                            opacity: '0.5',
                                        },
                                    },
                                }),
                            }}>
                                {activeRow ? (
                                    <TableRow className="bg-muted/50 shadow-lg">
                                        <TableCell className="w-[50px] p-2">
                                            <div className="flex h-full items-center justify-center">
                                                <GripVertical className="h-4 w-4"/>
                                            </div>
                                        </TableCell>
                                        {activeRow.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                style={{
                                                    width: cell.column.getSize(),
                                                    minWidth: cell.column.columnDef.minSize,
                                                    maxWidth: cell.column.columnDef.maxSize,
                                                }}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ) : null}
                            </DragOverlay>
                        </TableBody>
                    </DndContext>
                </Table>
            </div>
        </div>
    );
}