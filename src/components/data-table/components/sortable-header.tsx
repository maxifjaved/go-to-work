import { Header, Table as TableInstance, flexRender } from "@tanstack/react-table";
import { User } from "../columns";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { ArrowUpDown, ChevronDown, ChevronUp, GripHorizontal } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { ColumnResizer } from "../column-resizer";

interface SortableHeaderProps {
    header: Header<User, unknown>;
    table: TableInstance<User>;
}

export const SortableHeader = ({ header }: SortableHeaderProps) => {
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
            style={{ ...style, transform: CSS.Transform.toString(transform), transition: isDragging ? 'none' : transition }}
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
