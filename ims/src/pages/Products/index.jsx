import React, { useEffect } from 'react'
import useTitle from '../../hooks/useTitle';
import DataTablePage from "./Table/page"
import { useQuery } from '@tanstack/react-query';
import ProductForm from './components/ProductForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useAccountStore } from './store/productStore';

const Accounts = () => {
  useTitle('Products');

  // API Functions
  const axiosPrivate = useAxiosPrivate()

  // Get All Products
  const getAllProducts = async () => {
    const response = await axiosPrivate.get('/product')
    return response.data
  }

  // React Queries
  const { data: products } = useQuery({
    queryFn: getAllProducts,
    queryKey: ['product'],
  })

  // useEffect(() => {
  //   setAccounts(accounts)
  // }, [accounts])

  return (
    <>
      <h1 className='text-3xl font-bold'>Products</h1>
      <ProductForm />

      <DataTablePage products={products} />
    </>
  )
}

export default Accounts;