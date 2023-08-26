import React, { useState } from 'react'
import useTitle from '../../hooks/useTitle';
import DataTablePage from "./Table/page"
import Input from '../../components/Input'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from '../../components/Button';
import Address from './components/Address'
import AccountType from './components/AccountType';

const Accounts = () => {
    useTitle('Accounts');
    const [isLoading, setIsLoading] = useState(false);

    // Yup Validation Schema
    const accountSchema = Yup.object({
        name: Yup.string().required('Please enter a name'),
        type: Yup.string().required('Please select Account Type'),
        mobile: Yup.string().required('Please enter mobile'),
        city: Yup.string().required('Please enter city'),
    });

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(accountSchema),
        defaultValues: {
            name: '',
            type: '',
            mobile: '',
            city: ''
        }
    });

    // On Submit
    const onSubmit = (data) => {
        console.log("🚀 ~ file: index.jsx:51 ~ onSubmit ~ data:", data)
        setIsLoading(true)
    };

    return (
        <>
            <h1 className='text-3xl font-bold'>Accounts</h1>
            <div className='px-4 py-6 my-5 bg-white rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold'>Add new Account</h2>
                {/* Accounts Form */}
                <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-3'>
                    <Input
                        id='name'
                        label='Name'
                        type='text'
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                        required
                    />
                    <Input
                        id='mobile'
                        label='Mobile'
                        type='text'
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                        required
                    />
                    <AccountType
                        Controller={Controller}
                        control={control}
                        errors={errors}
                        isLoading={isLoading}
                    />
                    <Address
                        Controller={Controller}
                        control={control}
                        errors={errors}
                        isLoading={isLoading}
                    />
                    <Button
                        type='submit'
                        isLoading={isLoading}
                    >
                        Add Account
                    </Button>
                </form>
            </div>
            {/* Accounts Table */}
            <DataTablePage />
        </>
    )
}

export default Accounts;