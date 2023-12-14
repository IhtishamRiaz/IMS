import { capitalizeEachFirstWord } from "../../../lib/utils"
import { DataTable } from "./components/data-table"

// import DataTableColumns from "./components/columns"

export default function DataTablePage({ sales }) {

   const data = sales?.map(sale => {
      const date = new Date(sale.createdAt);
      const formattedDate = date.toLocaleDateString('en-GB');

      return {
         mainId: sale._id,
         id: sale.saleId,
         customer: sale?.customer?.name,
         subTotal: sale.subTotal,
         grandTotal: sale.grandTotal,
         discountAmount: sale.discountAmount,
         date: formattedDate,
         remarks: sale.remarks
      }
   })

   // Extracting All Filter Options

   // Extracting Customers
   const duplicateCustomers = sales?.map(sale => {
      return {
         value: sale?.customer?.name,
         label: capitalizeEachFirstWord(sale?.customer?.name),
      }
   })
   const customers = [...new Map(duplicateCustomers?.map(item => [item.value, item])).values()]

   return (
      <>
         <div className="px-4 py-6 bg-white rounded-lg shadow-md">
            <DataTable data={data || []} customers={customers} />
         </div>
      </>
   );
}