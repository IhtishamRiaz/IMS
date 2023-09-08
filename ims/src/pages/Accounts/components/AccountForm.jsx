import React, { useState } from 'react'
import Input from '../../../components/Input'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from '../../../components/Button';
import City from './City'
import AccountType from './AccountType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast'


const AccountForm = ({ accounts }) => {

  // API Functions
  const axiosPrivate = useAxiosPrivate()

  // Add Account
  const addAccount = async (data) => {
    axiosPrivate
      .post('/account', data)
      .then((res) => {
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

  const { mutateAsync: addAccountMutation } = useMutation({
    mutationFn: addAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts'])
    }
  })

  const updateAccountMutation = useMutation('addAccountFunc', {
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts'])
    }
  })
  const deleteAccountMutation = useMutation('addAccountFunc', {
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts'])
    }
  })

  const [isLoading, setIsLoading] = useState(false);

  // Yup Validation Schema
  const accountSchema = Yup.object({
    name: Yup.string().required('Please enter a name'),
    accountType: Yup.string().required('Please select Account Type'),
    mobile: Yup.string().required('Please enter mobile'),
    city: Yup.string().required('Please enter city'),
    salesRep: Yup.string(),
    isSalesman: Yup.boolean(),
  });

  const { register, handleSubmit: mainHandleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(accountSchema),
    defaultValues: {
      name: '',
      accountType: '',
      mobile: '',
      city: '',
      salesRep: '',
      isSalesman: false,
    }
  });

  // On Submit
  const mainOnSubmit = async (data) => {
    setIsLoading(true)
    await addAccountMutation(data)
  }

  return (
    <>
      <form onSubmit={mainHandleSubmit(mainOnSubmit)} id='main-form' className='mt-4 space-y-3'></form>
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
        accounts={accounts}
      />
      <City
        Controller={Controller}
        control={control}
        errors={errors}
        isLoading={isLoading}
      />
      <Button
        type='submit'
        isLoading={isLoading}
        form={'main-form'}
      >
        Add Account
      </Button>
    </>
  )
}

export default AccountForm