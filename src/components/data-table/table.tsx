import {
    ColumnDef,
    ColumnSizingState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {User} from "./columns";
import {ColumnResizer} from "./column-resizer";
import {useState} from "react";
import {ArrowUpDown, ChevronDown, ChevronUp} from "lucide-react";

export const DataTable = <TValue, >({
                                        columns,
                                        data,
                                    }: {
    columns: ColumnDef<User, TValue>[];
    data: User[];
}) => {
    const [colSizing, setColSizing] = useState<ColumnSizingState>({});
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnSizingChange: setColSizing,
        onSortingChange: setSorting,
        state: {
            columnSizing: colSizing,
            sorting,
        },
    });

    return (
        <div className="rounded-md border">
            <Table style={{width: table.getTotalSize()}}>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const isSortable = header.column.getCanSort();
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="relative"
                                        style={{
                                            width: header.getSize(),
                                        }}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={`flex items-center gap-2 ${
                                                    isSortable ? 'cursor-pointer select-none' : ''
                                                }`}
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
                                                                <ChevronUp className="h-4 w-4"/>
                                                            ) : (
                                                                <ChevronDown className="h-4 w-4"/>
                                                            )
                                                        ) : (
                                                            <ArrowUpDown className="h-4 w-4 text-gray-400"/>
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <ColumnResizer header={header}/>
                                    </TableHead>
                                );
                            })}
                        </TableRow>
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
    );
};