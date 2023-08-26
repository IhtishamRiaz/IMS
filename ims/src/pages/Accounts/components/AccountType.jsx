import React from 'react'
import Select from '../../../components/Select'
import { Plus as PlusCircle } from 'lucide-react';

const AccountType = ({ Controller, control, errors, isLoading }) => {


    const accountTypeOptions = [
        { value: "customer", label: "Customer" }, { value: "supplier", label: "Supplier", }, { value: "staff", label: "Staff", }
    ];

    return (
        <>
            <div className='relative'>
                <div className='absolute top-7 left-60 flex items-center bg-gray-100 p-1 rounded-lg cursor-pointer hover:bg-gray-200 text-brand-700'>
                    <PlusCircle size={20} />
                </div>
                <Select
                    Controller={Controller}
                    control={control}
                    errors={errors}
                    options={accountTypeOptions}
                    isLoading={isLoading}
                    name={'type'}
                    label={'Account Type'}
                    placeholder={'Select Account Type'}
                    optionsMessage={'No Type Found...'}
                />
            </div>
        </>
    )
}

export default AccountType