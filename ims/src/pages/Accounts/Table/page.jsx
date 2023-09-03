import { capitalizeEachFirstWord } from "../../../lib/utils"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export default function DataTablePage({ accounts }) {

  const tasks = accounts?.map(account => {
    return {
      id: account._id,
      name: capitalizeEachFirstWord(account.name),
      type: account.accountType.name,
      isSalesman: account.isSalesman,
      city: capitalizeEachFirstWord(account.city.name),
      area: capitalizeEachFirstWord(account.city.area.name),
      mobile: account.mobile,
    }
  })

  // Extracting All Filter Options
  // Extracting Account Types
  const duplicateTypes = accounts?.map(account => {
    return {
      value: account.accountType.name,
      label: capitalizeEachFirstWord(account.accountType.name),
    }
  })
  const accountTypes = [...new Map(duplicateTypes?.map(item => [item.value, item])).values()]

  // Extracting Cities
  const duplicateCities = accounts?.map(account => {
    return {
      value: account.city.name,
      label: capitalizeEachFirstWord(account.city.name),
    }
  })
  const cities = [...new Map(duplicateCities?.map(item => [item.value, item])).values()]

  // Extracting Areas
  const duplicateAreas = accounts?.map(account => {
    return {
      value: account.city.area.name,
      label: capitalizeEachFirstWord(account.city.area.name),
    }
  })
  const areas = [...new Map(duplicateAreas?.map(item => [item.value, item])).values()]

  // isSalesman Boolean Filters
  const isSalesman = [{ label: "Yes", value: true }, { label: "No", value: false }]

  return (
    <>
      <div className="px-4 py-6 bg-white rounded-lg shadow-md">
        <DataTable data={tasks || []} columns={columns} />
      </div>
    </>
  );
}