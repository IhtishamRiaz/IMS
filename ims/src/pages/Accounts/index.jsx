import React, { useState } from 'react'
import useTitle from '../../hooks/useTitle';
import DataTablePage from "./Table/page"
import { useQuery } from '@tanstack/react-query';
import AccountForm from './components/AccountForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Accounts = () => {
  useTitle('Accounts');

  // API Functions
  const axiosPrivate = useAxiosPrivate()

  // Get All Account Types
  const getAllAccounts = async () => {
    const response = await axiosPrivate.get('/account')
    return response.data
  }

  // React Queries
  const { data: accounts } = useQuery({
    queryFn: getAllAccounts,
    queryKey: ['accounts'],
  })

  return (
    <>
      <h1 className='text-3xl font-bold'>Accounts</h1>
      <div className='px-4 py-6 my-5 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold'>Add new Account</h2>
        <AccountForm accounts={accounts} />
      </div>

      <DataTablePage accounts={accounts} />
    </>
  )
}

export default Accounts;