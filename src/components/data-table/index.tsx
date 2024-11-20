'use client'

import { DataTable } from "./table";
import { columns, User } from "./columns";
import { users } from "./data";
import { useState } from "react";

const ListViewDataTable = () => {
   const [data, setData] = useState<User[]>(users);

   const handleRowOrderChange = (newData: User[]) => {
      setData(newData);
   };

   return (
       <DataTable
           columns={columns}
           data={data}
           onRowOrderChange={handleRowOrderChange}
       />
   );
}

export default ListViewDataTable;