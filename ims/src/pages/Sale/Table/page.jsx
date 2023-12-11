import { capitalizeEachFirstWord } from "../../../lib/utils"
import { DataTable } from "./components/data-table"

// import DataTableColumns from "./components/columns"

export default function DataTablePage({ purchases }) {

   const data = purchases?.map(purchase => {
      const date = new Date(purchase.createdAt);
      const formattedDate = date.toLocaleDateString('en-GB');

      return {
         mainId: purchase._id,
         id: purchase.purchaseId,
         supplier: purchase?.supplier?.name,
         subTotal: purchase.subTotal,
         grandTotal: purchase.grandTotal,
         discountAmount: purchase.discountAmount,
         date: formattedDate,
         remarks: purchase.remarks
      }
   })

   // Extracting All Filter Options

   // Extracting Suppliers
   const duplicateSuppliers = purchases?.map(purchase => {
      return {
         value: purchase?.supplier?.name,
         label: capitalizeEachFirstWord(purchase?.supplier?.name),
      }
   })
   const suppliers = [...new Map(duplicateSuppliers?.map(item => [item.value, item])).values()]

   return (
      <>
         <div className="px-4 py-6 bg-white rounded-lg shadow-md">
            <DataTable data={data || []} suppliers={suppliers} />
         </div>
      </>
   );
}