import { Cross2Icon } from "@radix-ui/react-icons"

import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { DataTableViewOptions } from "../../../../components/table/data-table-view-options"

// import { priorities, statuses } from "../data/data"
import { DataTableFacetedFilter } from "../../../../components/table/data-table-faceted-filter"


export function DataTableToolbar({ table, categories }) {

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
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="category"
            options={categories}
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
