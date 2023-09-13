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

  // Get All Account Types
  // const getAllAccounts = async () => {
  //   const response = await axiosPrivate.get('/account')
  //   return response.data
  // }

  // // React Queries
  // const { data: accounts } = useQuery({
  //   queryFn: getAllAccounts,
  //   queryKey: ['accounts'],
  // })

  // useEffect(() => {
  //   setAccounts(accounts)
  // }, [accounts])

  const accounts = []

  return (
    <>
      <h1 className='text-3xl font-bold'>Products</h1>
      <ProductForm />

      <DataTablePage accounts={accounts} />
    </>
  )
}

export default Accounts;