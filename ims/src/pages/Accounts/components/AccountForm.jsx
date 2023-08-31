import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from '../../../components/Button';
import City from './City'
import AccountType from './AccountType';
import { useMutation, useQueryClient } from 'react-query';

const AccountForm = () => {
  // React Queries
  const queryClient = useQueryClient()

  const addAccountMutation = useMutation('addAccountFunc', {
    onSuccess: () => {
      queryClient.invalidateQueries('accounts')
    }
  })
  const updateAccountMutation = useMutation('addAccountFunc', {
    onSuccess: () => {
      queryClient.invalidateQueries('accounts')
    }
  })
  const deleteAccountMutation = useMutation('addAccountFunc', {
    onSuccess: () => {
      queryClient.invalidateQueries('accounts')
    }
  })

  const [isLoading, setIsLoading] = useState(false);

  // Yup Validation Schema
  const accountSchema = Yup.object({
    name: Yup.string().required('Please enter a name'),
    type: Yup.string().required('Please select Account Type'),
    mobile: Yup.string().required('Please enter mobile'),
    city: Yup.string().required('Please enter city'),
    salesRep: Yup.string(),
    isSalesman: Yup.boolean(),
  });

  const { register, handleSubmit: mainHandleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(accountSchema),
    defaultValues: {
      name: '',
      type: '',
      mobile: '',
      city: '',
      salesRep: '',
      isSalesman: false,
    }
  });

  // On Submit
  const mainOnSubmit = (data) => {
    console.log("🚀 ~ file: AccountForm.jsx:57 ~ mainOnSubmit ~ data:", data)
    addAccountMutation.mutate(data)
    setIsLoading(true)
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