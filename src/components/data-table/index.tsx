'use client'

import { DataTable } from "./table";
import { columns } from "./columns";
import { users } from "./data";

export default () =>  <DataTable columns={columns} data={users} />