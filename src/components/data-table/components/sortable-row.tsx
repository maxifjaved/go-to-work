import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Row } from "@tanstack/react-table";
import { User } from "../columns";
import { TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";

interface SortableRowProps {
    row: Row<User>;
    columns: number;
}

export function SortableRow({ row }: SortableRowProps) {
    const {
        attributes,
        listeners,
        transform,
        transition,
        setNodeRef,
        isDragging,
    } = useSortable({
        id: row.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    } as const;

    return (
        <TableRow
            ref={setNodeRef}
            style={{ ...style, transform: CSS.Transform.toString(transform), transition: isDragging ? 'none' : transition }}
            className={`${isDragging ? "bg-muted/50 shadow-lg" : ""}`}
            data-state={row.getIsSelected() && "selected"}
        >
            <TableCell className="w-[50px] p-2">
                <div
                    {...attributes}
                    {...listeners}
                    className="flex h-full cursor-grab items-center justify-center"
                >
                    <GripVertical className="h-4 w-4" />
                </div>
            </TableCell>
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
    );
}
