import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from '../../../components/Button';
import City from './City'
import AccountType from './AccountType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { toast } from 'sonner'
import { useAccountStore } from '../store/accountStore';


const AccountForm = ({ accounts }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [typeValue, setTypeValue] = useState('')

  const isEdit = useAccountStore((state) => state.isEdit)
  const setIsEdit = useAccountStore((state) => state.setIsEdit)
  const accountToEdit = useAccountStore((state) => state.accountToEdit)
  const setAccountToEdit = useAccountStore((state) => state.setAccountToEdit)

  const completeResetValues = {
    name: '',
    accountType: '',
    mobile: '',
    city: '',
    salesRep: '',
    isSalesman: false,
  }

  let formDefaultValues = {
    name: '',
    accountType: '',
    mobile: '',
    city: '',
    salesRep: '',
    isSalesman: false,
  }
  if (isEdit) {
    formDefaultValues = {
      name: accountToEdit?.name,
      accountType: accountToEdit?.accountType?._id,
      mobile: accountToEdit?.mobile,
      city: accountToEdit?.city?._id,
      salesRep: accountToEdit?.salesRep?._id,
      isSalesman: accountToEdit?.isSalesman,
    }
  }

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
        reset(completeResetValues)
      })
  }

  // Edit Account
  const editAccount = async (data) => {
    axiosPrivate
      .put('/account/', data)
      .then((res) => {
        toast.success(res?.data?.message)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      })
      .finally(() => {
        setIsLoading(false)
        setIsEdit(false)
        setAccountToEdit(null)
        setTypeValue('')
        reset(completeResetValues)
      })
  }

  // React Queries
  const queryClient = useQueryClient()

  const { mutate: addAccountMutation } = useMutation({
    mutationFn: addAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts'])
      queryClient.refetchQueries(['accounts'])
    }
  })

  const { mutate: updateAccountMutation } = useMutation({
    mutationFn: editAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts'])
      queryClient.refetchQueries(['accounts'])
    }
  })

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
    defaultValues: formDefaultValues
  });

  // On Submit
  const mainOnSubmit = (data) => {
    setIsLoading(true)

    if (!isEdit) {
      addAccountMutation(data)
    } else {
      data.id = accountToEdit?._id
      updateAccountMutation(data)
    }
  }

  useEffect(() => {
    if (!isEdit || !accountToEdit) return
    setTypeValue(accountToEdit?.accountType?._id)
    reset(formDefaultValues)
  }, [isEdit, accountToEdit])

  const resetForm = () => {
    setIsEdit(false)
    setAccountToEdit(null)
    setTypeValue('')
    reset(completeResetValues)
  }

  return (
    <>
      <h2 className='text-2xl font-bold'>
        {isEdit ? 'Edit Account' : 'Add new Account'}
      </h2>

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
        typeValue={typeValue}
        setTypeValue={setTypeValue}
      />
      <City
        Controller={Controller}
        control={control}
        errors={errors}
        isLoading={isLoading}
      />
      <div>
        <Button
          type='submit'
          isLoading={isLoading}
          form={'main-form'}
        >
          {
            isEdit ? 'Edit Account' : 'Add Account'
          }
        </Button>
        {
          isEdit && <Button danger onClick={resetForm} >Exit Edit</Button>
        }
      </div>
    </>
  )
}

export default AccountForm