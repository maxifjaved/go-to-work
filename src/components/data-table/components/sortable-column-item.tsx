import { Column } from "@tanstack/react-table";
import { User } from "../columns";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Eye, EyeOff, GripVertical } from "lucide-react";

interface SortableColumnItemProps {
    column: Column<User, unknown>;
    isDragging?: boolean;
}

export const SortableColumnItem = ({ column, isDragging }: SortableColumnItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging: isSortableDragging,
    } = useSortable({
        id: column.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const sortDirection = column.getIsSorted();
    const isActive = isDragging || isSortableDragging;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "flex items-center gap-2 px-2 py-1.5",
                "hover:bg-accent/50 rounded-sm",
                isActive && "bg-accent/25"
            )}
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab touch-none p-1 rounded hover:bg-accent"
            >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 flex items-center gap-2">
                {column.getIsVisible() ? (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground opacity-50" />
                )}
                <span className="flex-1 truncate">
                    {column.id}
                </span>
                {sortDirection && (
                    <span className="text-muted-foreground">
                        {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </span>
                )}
            </div>
        </div>
    );
};