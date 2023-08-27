import React, { useState } from 'react'
import Select from '../../../components/Select'
import { Plus as PlusCircle } from 'lucide-react'
import Input from '../../../components/Input'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import Button from '../../../components/Button'
import { addAccountType } from '../../../api/accountTypeApi.js'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "../../../components/ui/dialog"


const AccountType = ({ Controller, control, errors: mainErrors, isLoading: mainIsLoading }) => {
    const [isLoading, setIsLoading] = useState(false);

    // Yup Validation Schema
    const accountSchema = Yup.object({
        name: Yup.string().required('Please enter a Account Type'),
    });

    const { register, handleSubmit: accountTypeHandleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(accountSchema),
        defaultValues: {
            name: '',
        }
    });

    // On Submit
    const accountTypeOnSubmit = (data) => {
        console.log("🚀 ~ file: index.jsx:51 ~ onSubmit ~ data:", data)
        setIsLoading(true)
        addAccountType(data);
    };

    const accountTypeOptions = [
        { value: "customer", label: "Customer" }, { value: "supplier", label: "Supplier", }, { value: "staff", label: "Staff", }
    ];

    return (
        <>
            <Dialog>
                <div className='relative'>
                    <div className='absolute flex items-center p-1 bg-gray-100 rounded-lg cursor-pointer top-7 left-60 hover:bg-gray-200 text-brand-700'>
                        <DialogTrigger>
                            <PlusCircle size={20} />
                        </DialogTrigger>
                    </div>

                    <Select
                        Controller={Controller}
                        control={control}
                        errors={mainErrors}
                        options={accountTypeOptions}
                        isLoading={mainIsLoading}
                        name={'type'}
                        label={'Account Type'}
                        placeholder={'Select Account Type'}
                        optionsMessage={'No Type Found...'}
                    />
                </div>

                {/* Dialog Content */}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new Account Type</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={accountTypeHandleSubmit(accountTypeOnSubmit)}>
                        <div className='mt-4 space-y-8'>
                            <Input
                                id='name'
                                label='Account Type'
                                type='text'
                                register={register}
                                errors={errors}
                                disabled={isLoading}
                                required
                            />

                            <Button type={'submit'} isLoading={isLoading}>
                                Add Type
                            </Button>
                        </div>

                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AccountType