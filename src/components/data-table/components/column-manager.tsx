import {Table as TableInstance} from "@tanstack/react-table";
import {User} from "../columns";
import {useState} from "react";
import {Settings2} from "lucide-react";
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
    DragOverEvent, defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import type {KeyboardCoordinateGetter} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import {
    restrictToVerticalAxis,
    snapCenterToCursor,
} from '@dnd-kit/modifiers';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {SortableColumnItem} from "./sortable-column-item";
import {AnimatePresence, motion} from "framer-motion";
import {cn} from "@/lib/utils";

interface ColumnManagerProps {
    table: TableInstance<User>;
}

const keyboardCoordinatesGetter: KeyboardCoordinateGetter = (event) => {
    const dropdownContent = document.querySelector('[data-dropdown-content]');
    if (!dropdownContent) return {x: 0, y: 0};

    const rect = dropdownContent.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: (event as unknown as MouseEvent).clientY || rect.top,
    };
};

export const ColumnManager = ({table}: ColumnManagerProps) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [overId, setOverId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
                delay: 50,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: keyboardCoordinatesGetter,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
        document.body.style.cursor = 'grabbing';
    };

    const handleDragOver = (event: DragOverEvent) => {
        const {over} = event;
        setOverId(over ? over.id as string : null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        setActiveId(null);
        setOverId(null);
        document.body.style.cursor = '';

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

        table.setColumnOrder(newOrder);
    };

    const activeColumn = activeId ? table.getColumn(activeId) : null;
    const columns = table.getAllLeafColumns();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                    <Settings2 className="mr-2 h-4 w-4"/>
                    View
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-[250px] max-h-[500px]"
                data-dropdown-content
            >
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis, snapCenterToCursor]}
                >
                    <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                        Column Management
                    </div>
                    <DropdownMenuSeparator/>
                    <div
                        className="px-1 py-2 overflow-y-auto max-h-[400px] relative"
                        style={{scrollbarGutter: 'stable'}}
                    >
                        <SortableContext
                            items={columns.map((col) => col.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <AnimatePresence>
                                {columns.map((column) => (
                                    <motion.div
                                        key={column.id}
                                        initial={{opacity: 0, y: -10}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: 10}}
                                        transition={{duration: 0.15}}
                                    >
                                        <div
                                            onClick={() => column.toggleVisibility()}
                                            className={cn(
                                                "cursor-pointer relative",
                                                overId === column.id && "before:absolute before:inset-0 before:bg-accent/50 before:rounded-sm",
                                                activeId === column.id && "opacity-50"
                                            )}
                                        >
                                            <SortableColumnItem column={column}/>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </SortableContext>
                    </div>
                    <DragOverlay
                        dropAnimation={{
                            duration: 150,
                            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                            sideEffects: defaultDropAnimationSideEffects({
                                styles: {
                                    active: {
                                        opacity: '0.4',
                                    },
                                },
                            }),
                        }}
                    >
                        {activeColumn ? (
                            <div className="px-1 py-0.5 bg-background rounded-sm shadow-md border">
                                <SortableColumnItem column={activeColumn} isDragging/>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    className="justify-center text-center"
                    onClick={() => table.resetColumnVisibility()}
                >
                    Reset Columns
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};