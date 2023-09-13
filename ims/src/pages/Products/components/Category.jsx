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

const Category = ({ Controller, control, errors: mainErrors, isLoading: mainIsLoading }) => {
  const [isLoading, setIsLoading] = useState(false);

  // API Functions
  const axiosPrivate = useAxiosPrivate()

  // Get All Account Types
  const getAllProductCategories = async () => {
    const response = await axiosPrivate.get('/product/category')
    return response.data
  }

  // Add Account Type
  const addProductCategory = async (data) => {
    axiosPrivate
      .post('/product/category', data)
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

  const { data: categories } = useQuery({
    queryFn: getAllProductCategories,
    queryKey: ['productCategory'],
  })

  const { mutate: addProductCategoryMutation } = useMutation({
    mutationFn: addProductCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['productCategory'])
      queryClient.refetchQueries(['productCategory'])
    }
  })

  // Select Options
  const categoryOptions = (categories || [])?.map(type => {
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
    setIsLoading(true)
    addProductCategoryMutation(data)
  };

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
            options={categoryOptions || []}
            isLoading={mainIsLoading}
            name={'category'}
            label={'Product Category'}
            placeholder={'Select Category'}
            optionsMessage={'No Category Found...'}
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
                label='Product Category'
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

export default Category