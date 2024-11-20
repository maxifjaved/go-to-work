import {Header} from "@tanstack/react-table";
import {User} from "../columns";
import {GripHorizontal} from "lucide-react";
import {flexRender} from "@tanstack/react-table";

interface DragPreviewProps {
    header: Header<User, unknown>;
}

export const DragPreview = ({header}: DragPreviewProps) => {
    return (
        <div
            className="rounded border bg-background px-4 py-2 shadow-lg"
            style={{
                width: header.getSize(),
                maxWidth: "300px",
            }}
        >
            <div className="flex items-center gap-2">
                <GripHorizontal className="h-4 w-4 text-muted-foreground"/>
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