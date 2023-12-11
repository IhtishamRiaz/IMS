import React, { useEffect } from 'react'
import useTitle from '../../hooks/useTitle';
import DataTablePage from "./Table/page"
import { useQuery } from '@tanstack/react-query';
import ProductForm from './components/PurchaseForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { usePurchaseStore } from './store/purchaseStore';

const Sale = () => {
   useTitle('Sale Invoice');

   // const setSales = useSaleStore((state) => state.setSales);

   // API Functions
   const axiosPrivate = useAxiosPrivate()

   // Get All Accounts
   const getAllAccounts = async () => {
      const response = await axiosPrivate.get('/account')
      return response.data
   }

   // Get All Products
   const getAllProducts = async () => {
      const response = await axiosPrivate.get('/product')
      return response.data
   }
   // Get All Sales
   const getAllSales = async () => {
      const response = await axiosPrivate.get('/sale')
      return response.data
   }

   // React Queries
   const { data: products } = useQuery({
      queryFn: getAllProducts,
      queryKey: ['products'],
   })

   const { data: accounts } = useQuery({
      queryFn: getAllAccounts,
      queryKey: ['accounts'],
   })

   const { data: sales } = useQuery({
      queryFn: getAllSales,
      queryKey: ['sales'],
   })

   // useEffect(() => {
   //    setSales(sales)
   // }, [sales])

   return (
      <>
         <h1 className='text-3xl font-bold'>Sale Invoice</h1>
         <ProductForm accounts={accounts} products={products} />

         {/* <DataTablePage products={products} purchases={purchases} /> */}
      </>
   )
}

export default Sale;