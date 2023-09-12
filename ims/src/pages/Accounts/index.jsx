import React, { useEffect } from 'react'
import useTitle from '../../hooks/useTitle';
import DataTablePage from "./Table/page"
import { useQuery } from '@tanstack/react-query';
import AccountForm from './components/AccountForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useAccountStore } from './store/accountStore';

const Accounts = () => {
  useTitle('Accounts');
  const setAccounts = useAccountStore((state) => state.setAccounts);

  // API Functions
  const axiosPrivate = useAxiosPrivate()

  // Get All Account Types
  const getAllAccounts = async () => {
    const response = await axiosPrivate.get('/account')
    console.log(response.data);
    return response.data
  }

  // React Queries
  const { data: accounts } = useQuery({
    queryFn: getAllAccounts,
    queryKey: ['accounts'],
  })

  useEffect(() => {
    setAccounts(accounts)
  }, [accounts])

  return (
    <>
      <h1 className='text-3xl font-bold'>Accounts</h1>
      <div className='px-4 py-6 my-5 bg-white rounded-lg shadow-md'>
        <AccountForm accounts={accounts} />
      </div>

      <DataTablePage accounts={accounts} />
    </>
  )
}

export default Accounts;