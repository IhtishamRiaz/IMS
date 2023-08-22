import React from 'react'
import useTitle from '../../hooks/useTitle';
import DataTablePage from "./Table/page"

const Accounts = () => {
    useTitle('Accounts');

    return (
        <>
            <h1 className='text-3xl font-bold'>Accounts</h1>
            <DataTablePage />
        </>
    )
}

export default Accounts;