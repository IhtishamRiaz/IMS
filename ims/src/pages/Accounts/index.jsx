import React from 'react'
import useTitle from '../../hooks/useTitle';
import DataTablePage from "./Table/page"
import { useQuery, useQueryClient } from 'react-query';
import AccountForm from './components/AccountForm';

const Accounts = () => {
  useTitle('Accounts');
  // React Queries
  const queryClient = useQueryClient()

  const { isError, error, isLoading: isAccountsLoading, data: accounts } = useQuery('accounts', () => { })

  return (
    <>
      <h1 className='text-3xl font-bold'>Accounts</h1>
      <div className='px-4 py-6 my-5 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold'>Add new Account</h2>
        <AccountForm />
      </div>

      <DataTablePage />
    </>
  )
}

export default Accounts;