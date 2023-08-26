import React from 'react'
import Select from '../../../components/Select'
import { Plus as PlusCircle } from 'lucide-react';

const Address = ({ Controller, control, errors, isLoading }) => {

    const cityOptions = [
        { value: "سرگودھا", label: "سرگودھا", }
    ]

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
                    options={cityOptions}
                    isLoading={isLoading}
                    name={'city'}
                    label={'City'}
                    placeholder={'Select City'}
                    optionsMessage={'No City Found...'}
                />
            </div>
        </>
    )
}

export default Address