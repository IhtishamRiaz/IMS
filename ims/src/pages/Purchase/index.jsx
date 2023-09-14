import React, { useEffect } from 'react'
import useTitle from '../../hooks/useTitle';
import DataTablePage from "./Table/page"
import { useQuery } from '@tanstack/react-query';
import ProductForm from './components/ProductForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useProductStore } from './store/productStore';

const Purchase = () => {
  useTitle('Purchase Invoice');

  const setProducts = useProductStore((state) => state.setProducts);

  // API Functions
  const axiosPrivate = useAxiosPrivate()

  // Get All Accounts
  const getAllAccounts = async () => {
    const response = await axiosPrivate.get('/account')
    return response.data
  }

  const { data: accounts } = useQuery({
    queryFn: getAllAccounts,
    queryKey: ['accounts'],
  })

  // Get All Products
  const getAllProducts = async () => {
    const response = await axiosPrivate.get('/product')
    return response.data
  }

  // React Queries
  const { data: products } = useQuery({
    queryFn: getAllProducts,
    queryKey: ['products'],
  })

  useEffect(() => {
    setProducts(products)
  }, [products])

  return (
    <>
      <h1 className='text-3xl font-bold'>Purchase Invoice</h1>
      <ProductForm products={products} accounts={accounts} />

      <DataTablePage products={products} />
    </>
  )
}

export default Purchase;