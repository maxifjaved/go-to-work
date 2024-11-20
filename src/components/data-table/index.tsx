'use client'

import { DataTable } from "./table";
import { columns } from "./columns";
import { users } from "./data";

const ListViewDataTable = () =>  <DataTable columns={columns} data={users} />


export default ListViewDataTable;