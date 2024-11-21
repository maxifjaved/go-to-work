"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search as SearchIcon } from "lucide-react"

export function Search() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                    <SearchIcon className="h-4 w-4" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Input
                            id="search"
                            placeholder="Search everything..."
                            className="h-9"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}