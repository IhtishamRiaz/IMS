import { capitalizeEachFirstWord } from "../../../lib/utils"
import { DataTable } from "./components/data-table"

// import DataTableColumns from "./components/columns"

export default function DataTablePage({ products }) {

  const data = products?.map(product => {
    return {
      mainId: product._id,
      id: product.productId,
      name: capitalizeEachFirstWord(product.name),
      min: product.min,
      max: product.max,
      price: product.price,
      stock: product.stock,
      category: product.category?.name,
      supplier: product.supplier?.name
    }
  })

  // Extracting All Filter Options
  // Extracting Account Types
  const duplicateCategories = products?.map(product => {
    return {
      value: product.category?.name,
      label: capitalizeEachFirstWord(product.category?.name),
    }
  })
  const categories = [...new Map(duplicateCategories?.map(item => [item.value, item])).values()]

  // Extracting Suppliers
  const duplicateSuppliers = products?.map(product => {
    return {
      value: product.supplier?.name,
      label: capitalizeEachFirstWord(product.supplier?.name),
    }
  })
  const suppliers = [...new Map(duplicateSuppliers?.map(item => [item.value, item])).values()]

  return (
    <>
      <div className="px-4 py-6 bg-white rounded-lg shadow-md">
        <DataTable data={data || []} categories={categories} suppliers={suppliers} />
      </div>
    </>
  );
}