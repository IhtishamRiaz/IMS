import React, { useState } from 'react'
import Select from '../../../components/Select'
import { Plus as PlusCircle } from 'lucide-react'
import Input from '../../../components/Input'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import Button from '../../../components/Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../../components/ui/dialog"
import { capitalizeFirstWord } from '../../../lib/utils'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import toast from 'react-hot-toast'

const AccountType = ({ Controller, control, errors: mainErrors, isLoading: mainIsLoading, accounts, typeValue, setTypeValue }) => {
  const [isLoading, setIsLoading] = useState(false);

  // API Functions
  const axiosPrivate = useAxiosPrivate()

  // Get All Account Types
  const getAllAccountTypes = async () => {
    const response = await axiosPrivate.get('/account/type')
    return response.data
  }

  // Add Account Type
  const addAccountType = async (data) => {
    axiosPrivate
      .post('/account/type', data)
      .then(res => {
        toast.success(res?.data?.message)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      })
      .finally(() => {
        setIsLoading(false)
        reset()
      })
  }

  // React Queries
  const queryClient = useQueryClient()

  const { data: accountTypes } = useQuery({
    queryFn: getAllAccountTypes,
    queryKey: ['accountTypes'],
  })

  const { mutate: addAccountTypeMutation } = useMutation({
    mutationFn: addAccountType,
    onSuccess: () => {
      queryClient.invalidateQueries(['accountTypes'])
      queryClient.refetchQueries(['accountTypes'])
    }
  })

  // Select Options
  const accountTypeOptions = (accountTypes || [])?.map(type => {
    return {
      value: type._id,
      label: capitalizeFirstWord(type.name)
    }
  })

  const booleanOptions = [
    {
      value: true,
      label: 'Yes'
    },
    {
      value: false,
      label: 'No'
    }
  ]

  const staffAccounts = accounts?.filter(account => {
    return account.accountType.name === 'staff'
  })

  const salesRepOptions = staffAccounts?.map(account => {
    return {
      value: account._id,
      label: capitalizeFirstWord(account.name)
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
    addAccountTypeMutation(data)
    setIsLoading(true)
  };

  const selectedType = accountTypes?.find(type => {
    return type._id === typeValue
  })
  const salesmanVisible = selectedType?.name === 'staff'
  const salesRepVisible = selectedType?.name === 'customer'

  return (
    <>
      <Dialog>
        <div className='relative'>
          <div className='absolute cursor-pointer read-only: top-7 left-60 text-brand-700'>
            <DialogTrigger className='p-1 transition-colors rounded-md hover:bg-brand-200 bg-brand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600'>
              <PlusCircle size={20} />
            </DialogTrigger>
          </div>

          <Select
            Controller={Controller}
            control={control}
            errors={mainErrors}
            options={accountTypeOptions || []}
            isLoading={mainIsLoading}
            name={'accountType'}
            label={'Account Type'}
            placeholder={'Select Account Type'}
            optionsMessage={'No Type Found...'}
            setTypeValue={setTypeValue}
          />
        </div>
        <Select
          Controller={Controller}
          control={control}
          errors={mainErrors}
          options={salesRepOptions || []}
          isLoading={mainIsLoading}
          name={'salesRep'}
          label={'Sales Representative'}
          placeholder={'Select Sales Rep'}
          optionsMessage={'No Sales Rep...'}
          isDisabled={!salesRepVisible}
        />
        <Select
          Controller={Controller}
          control={control}
          errors={mainErrors}
          options={booleanOptions || []}
          isLoading={mainIsLoading}
          name={'isSalesman'}
          label={'Is Salesman?'}
          placeholder={'Select Sales Rep'}
          optionsMessage={'No Options...'}
          isDisabled={!salesmanVisible}
        />

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