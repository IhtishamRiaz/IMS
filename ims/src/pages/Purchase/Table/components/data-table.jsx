import * as React from "react"
import {
   flexRender,
   getCoreRowModel,
   getFacetedRowModel,
   getFacetedUniqueValues,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table"

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "../../../../components/ui/table"

import { Checkbox } from "../../../../components/ui/checkbox"

import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { DataTablePagination } from "../../../../components/table/data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"


export function DataTable({ data, categories, suppliers }) {

   // ========================== Columns ==========================
   const columns = [
      {
         id: "select",
         header: ({ table }) => (
            <Checkbox
               checked={table.getIsAllPageRowsSelected()}
               onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
               aria-label="Select all"
               className="translate-y-[2px]"
            />
         ),
         cell: ({ row }) => (
            <Checkbox
               checked={row.getIsSelected()}
               onCheckedChange={(value) => row.toggleSelected(!!value)}
               aria-label="Select row"
               className="translate-y-[2px]"
            />
         ),
         enableSorting: false,
         enableHiding: false,
      },
      // ID
      {
         accessorKey: "id",
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
         ),
         cell: ({ row }) => (
            <div>
               {row.getValue("id")}
            </div>
         ),
         enableSorting: false,
         enableHiding: false,
      },
      // Supplier
      {
         accessorKey: "supplier",
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Supplier" />
         ),
         cell: ({ row }) => {

            return (
               <div className="flex space-x-2">
                  <span className="max-w-[500px] truncate font-medium">
                     {row.getValue("supplier")}
                  </span>
               </div>
            )
         },
      },
      // Category
      // {
      //    accessorKey: "category",
      //    header: ({ column }) => (
      //       <DataTableColumnHeader column={column} title="Category" />
      //    ),
      //    cell: ({ row }) => {
      //       const category = categories.find(
      //          (category) => category.value === row.getValue("category")
      //       )

      //       if (!category) {
      //          return null
      //       }

      //       return (
      //          <div>
      //             <span>{category.label}</span>
      //          </div>
      //       )
      //    },
      //    filterFn: (row, id, value) => {
      //       return value.includes(row.getValue(id))
      //    },
      // },
      // // Supplier
      // {
      //    accessorKey: "supplier",
      //    header: ({ column }) => (
      //       <DataTableColumnHeader column={column} title="Supplier" />
      //    ),
      //    cell: ({ row }) => {
      //       const supplier = suppliers.find(
      //          (supplier) => supplier.value === row.getValue("supplier")
      //       )

      //       if (!supplier) {
      //          return null
      //       }

      //       return (
      //          <div>
      //             <span>{supplier.label}</span>
      //          </div>
      //       )
      //    },
      //    filterFn: (row, id, value) => {
      //       return value.includes(row.getValue(id))
      //    },
      // },
      // Min
      {
         accessorKey: "date",
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
         ),
         cell: ({ row }) => {

            return (
               <div className="truncate">
                  <span>{row.getValue("date")}</span>
               </div>
            )
         },
         filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
         },
      },
      // Sub Total
      {
         accessorKey: "subTotal",
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sub Total" />
         ),
         cell: ({ row }) => {

            return (
               <div className="truncate">
                  <span>{row.getValue("subTotal")}</span>
               </div>
            )
         },
         filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
         },
      },
      // Discount
      {
         accessorKey: "discountAmount",
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Discount" />
         ),
         cell: ({ row }) => {

            return (
               <div className="truncate">
                  <span>{row.getValue("discountAmount")}</span>
               </div>
            )
         },
         filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
         },
      },
      // Grand Total
      {
         accessorKey: "grandTotal",
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total" />
         ),
         cell: ({ row }) => {

            return (
               <div>
                  <span className="truncate">
                     {row.getValue("grandTotal")}
                  </span>
               </div>
            )
         },
         enableSorting: false,
      },
      // Remarks
      {
         accessorKey: "remarks",
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Remarks" />
         ),
         cell: ({ row }) => {

            return (
               <div className="max-w-[200px]">
                  <span>
                     {row.getValue("remarks")}
                  </span>
               </div>
            )
         },
         enableSorting: false,
      },
      {
         id: "actions",
         cell: ({ row }) => <DataTableRowActions row={row} />,
      },
   ]


   // ========================== Data Table ==========================

   const [rowSelection, setRowSelection] = React.useState({})
   const [columnVisibility, setColumnVisibility] = React.useState({})
   const [columnFilters, setColumnFilters] = React.useState([])
   const [sorting, setSorting] = React.useState([])

   const table = useReactTable({
      data,
      columns,
      state: {
         sorting,
         columnVisibility,
         rowSelection,
         columnFilters,
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
   })

   return (
      <div className="space-y-4">
         <DataTableToolbar table={table} categories={categories} suppliers={suppliers} />
         <div className="border rounded-md">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                       header.column.columnDef.header,
                                       header.getContext()
                                    )}
                              </TableHead>
                           )
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           No Accounts Found.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <DataTablePagination table={table} />
      </div>
   )
}