import { Cross2Icon } from "@radix-ui/react-icons"

import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

// import { priorities, statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"


export function DataTableToolbar({ table, areas, cities, accountTypes, isSalesman, salesReps }) {

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1 space-x-2">
        <Input
          placeholder="Search by ID"
          value={(table.getColumn("id")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Input
          placeholder="Search by Name"
          value={(table.getColumn("name")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="type"
            options={accountTypes}
          />
        )}
        {table.getColumn("isSalesman") && (
          <DataTableFacetedFilter
            column={table.getColumn("isSalesman")}
            title="isSalesman"
            options={isSalesman}
          />
        )}
        {table.getColumn("salesRep") && (
          <DataTableFacetedFilter
            column={table.getColumn("salesRep")}
            title="salesRep"
            options={salesReps}
          />
        )}
        {table.getColumn("city") && (
          <DataTableFacetedFilter
            column={table.getColumn("city")}
            title="city"
            options={cities}
          />
        )}
        {table.getColumn("area") && (
          <DataTableFacetedFilter
            column={table.getColumn("area")}
            title="area"
            options={areas}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
