import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import Button from '../../../components/Button'
import Category from './Category.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import toast from 'react-hot-toast'
import { useProductStore } from '../store/productStore'
import { capitalizeEachFirstWord } from '../../../lib/utils'


const ProductForm = ({ accounts, products }) => {
  const [isLoading, setIsLoading] = useState(false)

  const completeResetValues = {
    name: '',
    price: '',
    min: '',
    max: '',
    category: '',
    supplier: ''
  }

  let formDefaultValues = {
    name: '',
    price: '',
    min: '',
    max: '',
    category: '',
    supplier: ''
  }

  // API Functions
  const axiosPrivate = useAxiosPrivate()
  const addProduct = async (data) => {
    axiosPrivate.post('/product', data)
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

  // React Queries

  const queryClient = useQueryClient()

  const { mutate: addProductMutation } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
      queryClient.refetchQueries(['products'])
    }
  })


  // Yup Validation Schema
  const productSchema = Yup.object({
    name: Yup.string().required('Please enter a name'),
    price: Yup.number().typeError("Must be a number").required('Please enter a price'),
    min: Yup.number().typeError("Must be a number").required('Please enter a min value'),
    max: Yup.number().typeError("Must be a number").required('Please enter a max value'),
    category: Yup.string().required('Please select a category'),
    supplier: Yup.string().required('Please select a supplier'),
  });

  const { register, handleSubmit: mainHandleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: formDefaultValues
  });

  // On Submit
  const mainOnSubmit = (data) => {
    setIsLoading(true)
    addProductMutation(data)
  }

  // Filter Sellers
  const suppliers = accounts?.filter((acc) => {
    return acc.accountType.name === 'supplier'
  })

  const supplierOptions = suppliers?.map((supplier) => {
    return {
      value: supplier._id,
      label: capitalizeEachFirstWord(supplier.name)
    }
  })

  return (
    <div className='px-4 py-6 my-5 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold'>
        Create Purchase Invoice
      </h2>

      <form onSubmit={mainHandleSubmit(mainOnSubmit)} id='main-form' className='mt-4 space-y-3'></form>
      <div>
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
          id='price'
          label='Price'
          type='text'
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Input
          id='min'
          label='Min'
          type='text'
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Input
          id='max'
          label='Max'
          type='text'
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Category
          Controller={Controller}
          control={control}
          errors={errors}
          isLoading={isLoading}
        />
        <Select
          Controller={Controller}
          control={control}
          errors={errors}
          options={supplierOptions || []}
          isLoading={isLoading}
          name={'supplier'}
          label={'Supplier'}
          placeholder={'Select Supplier'}
          optionsMessage={'No Supplier Found...'}
        />
        <Button
          type='submit'
          isLoading={isLoading}
          form={'main-form'}
        >
          Add Account
        </Button>
      </div>
    </div>
  )
}

export default ProductForm