import { capitalizeEachFirstWord } from "../../../lib/utils"
import { DataTable } from "./components/data-table"

// import DataTableColumns from "./components/columns"

export default function DataTablePage({ accounts }) {

  const tasks = accounts?.map(account => {
    return {
      mainId: account._id,
      id: account.accountId,
      name: capitalizeEachFirstWord(account.name),
      type: account.accountType.name,
      isSalesman: account.isSalesman,
      salesRep: account.salesRep?.name || 'nil',
      city: account.city.name,
      area: account.city.area?.name || 'nil',
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
      value: account.city.area?.name || 'nil',
      label: capitalizeEachFirstWord(account.city.area?.name || 'nil'),
    }
  })
  const areas = [...new Map(duplicateAreas?.map(item => [item.value, item])).values()]

  // Extracting SalesReps
  const duplicateSalesReps = accounts?.map(account => {
    return {
      value: account.salesRep?.name || 'nil',
      label: capitalizeEachFirstWord(account.salesRep?.name || 'nil'),
    }
  })
  const salesReps = [...new Map(duplicateSalesReps?.map(item => [item.value, item])).values()]

  // isSalesman Boolean Filters
  const isSalesman = [{ label: "Yes", value: true }, { label: "No", value: false }]

  return (
    <>
      <div className="px-4 py-6 bg-white rounded-lg shadow-md">
        <DataTable data={tasks || []} areas={areas} cities={cities} accountTypes={accountTypes} isSalesman={isSalesman} salesReps={salesReps} />
      </div>
    </>
  );
}