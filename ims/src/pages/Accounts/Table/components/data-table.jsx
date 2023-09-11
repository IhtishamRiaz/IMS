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

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { useAccountStore } from "../../store/accountStore"


export function DataTable({ data, areas, cities, accountTypes, isSalesman, salesReps }) {

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
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    // Name
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {

        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        )
      },
    },
    // Account Type
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = accountTypes.find(
          (type) => type.value === row.getValue("type")
        )

        if (!type) {
          return null
        }

        return (
          <div className="flex w-[100px] items-center">
            {type.icon && (
              <type.icon className="w-4 h-4 mr-2 text-muted-foreground" />
            )}
            <span>{type.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    // IsSalesman
    {
      accessorKey: "isSalesman",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Is Salesman" />
      ),
      cell: ({ row }) => {
        const salesman = isSalesman.find(
          (salesman) => salesman.value === row.getValue("isSalesman")
        )

        if (!salesman) {
          return null
        }

        return (
          <div className="truncate">
            <span>{salesman.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    // Sales Rep
    {
      accessorKey: "salesRep",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sales Rep" />
      ),
      cell: ({ row }) => {
        const salesRep = salesReps.find(
          (salesRep) => salesRep.value === row.getValue("salesRep")
        )

        if (!salesRep) {
          return null
        }

        return (
          <div>
            <span>{salesRep.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    // City
    {
      accessorKey: "city",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="City" />
      ),
      cell: ({ row }) => {
        const city = cities.find(
          (city) => city.value === row.getValue("city")
        )

        if (!city) {
          return null
        }

        return (
          <div className="truncate">
            <span>{city.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    // Area
    {
      accessorKey: "area",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Area" />
      ),
      cell: ({ row }) => {
        const area = areas.find(
          (area) => area.value === row.getValue("area")
        )

        if (!area) {
          return null
        }

        return (
          <div className="truncate">
            <span>{area.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    // Mobile
    {
      accessorKey: "mobile",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mobile" />
      ),
      cell: ({ row }) => {

        return (
          <div>
            <span className="truncate">
              {row.getValue("mobile")}
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
      <DataTableToolbar table={table} areas={areas} cities={cities} accountTypes={accountTypes} isSalesman={isSalesman} salesReps={salesReps} />
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