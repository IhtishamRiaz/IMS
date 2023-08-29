import React, { useState } from 'react'
import Select from '../../../components/Select'
import { Plus as PlusCircle } from 'lucide-react'
import Input from '../../../components/Input'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import Button from '../../../components/Button'
import { addAccountType, getAllAccountTypes } from '../../../api/accountsApi.js'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "../../../components/ui/dialog"
import { capitalizeFirstWord } from '../../../lib/utils'


const AccountType = ({ Controller, control, errors: mainErrors, isLoading: mainIsLoading }) => {

    // React Queries
    const queryClient = useQueryClient()
    const { isError, error, isLoading: isAccountTypesLoading, data: accountTypes } = useQuery('accountTypes', getAllAccountTypes)

    const addAccountTypeMutation = useMutation(addAccountType, {
        onSuccess: () => {
            queryClient.invalidateQueries('accountTypes')
        }
    })

    const [isLoading, setIsLoading] = useState(false);

    const accountTypeOptions = accountTypes?.map(type => {
        return {
            value: type._id,
            label: capitalizeFirstWord(type.name)
        }
    })

    // Yup Validation Schema
    const accountSchema = Yup.object({
        name: Yup.string().required('Please enter a Account Type'),
    });

    // React Hook Form
    const { register, handleSubmit: accountTypeHandleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(accountSchema),
        defaultValues: {
            name: '',
        }
    });

    // On Submit
    const accountTypeOnSubmit = (data) => {
        addAccountTypeMutation.mutate(data)
        reset()
    };

    return (
        <>
            <Dialog>
                <div className='relative'>
                    <div className='absolute cursor-pointer read-only: top-7 left-60 text-brand-700'>
                        <DialogTrigger>
                            <Button ghost>
                                <PlusCircle size={20} />
                            </Button>
                        </DialogTrigger>
                    </div>

                    <Select
                        Controller={Controller}
                        control={control}
                        errors={mainErrors}
                        options={accountTypeOptions || []}
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