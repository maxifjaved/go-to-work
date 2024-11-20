import { ColumnDef } from "@tanstack/react-table";

export type User = {
    id: number;
    email: string;
    name: string;
    age: number;
    address: string;
    language: string;
    airLine: string;
    origin: string;
    destination: string;
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "Id",
        minSize: 50,
        maxSize: 100,
        enableSorting: true,
    },
    {
        accessorKey: "email",
        header: "Email",
        minSize: 200,
        enableSorting: true,
    },
    {
        accessorKey: "name",
        header: "Name",
        minSize: 200,
        enableSorting: true,
    },
    {
        accessorKey: "age",
        header: "Age",
        minSize: 50,
        maxSize: 100,
        enableSorting: true,
    },
    {
        accessorKey: "address",
        header: "Address",
        minSize: 200,
        enableSorting: true,
    },
    {
        accessorKey: "language",
        header: "Language",
        minSize: 200,
        enableSorting: true,
    },
    {
        accessorKey: "airLine",
        header: "Airline",
        minSize: 200,
        enableSorting: true,
    },
    {
        accessorKey: "origin",
        header: "Origin",
        minSize: 200,
        enableSorting: true,
    },
    {
        accessorKey: "destination",
        header: "Destination",
        minSize: 200,
        enableSorting: true,
    },
];