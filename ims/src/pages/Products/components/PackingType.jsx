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
import { toast } from 'sonner'

const PackingType = ({ Controller, control, errors: mainErrors, isLoading: mainIsLoading }) => {
  const [isLoading, setIsLoading] = useState(false);

  // API Functions
  const axiosPrivate = useAxiosPrivate()

  // Get All Packing Types Types
  const getAllPackingTypes = async () => {
    const response = await axiosPrivate.get('/product/packingType')
    return response.data
  }

  // Add Packing Type
  const addPackingType = async (data) => {
    axiosPrivate
      .post('/product/packingType', data)
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

  const { data: packingTypes } = useQuery({
    queryFn: getAllPackingTypes,
    queryKey: ['packingType'],
  })

  const { mutate: addPackingTypeMutation } = useMutation({
    mutationFn: addPackingType,
    onSuccess: () => {
      queryClient.invalidateQueries(['packingType'])
      queryClient.refetchQueries(['packingType'])
    }
  })

  // Select Options
  const packingTypeOptions = (packingTypes || [])?.map(type => {
    return {
      value: type._id,
      label: capitalizeFirstWord(type.name)
    }
  })

  // Yup Validation Schema
  const PackingTypeSchema = Yup.object({
    name: Yup.string().required('Please enter a Packing Type'),
  });

  // React Hook Form
  const { register, handleSubmit: packingTypeHandleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(PackingTypeSchema),
    defaultValues: {
      name: '',
    }
  });

  // On Submit
  const packingTypeOnSubmit = (data) => {
    setIsLoading(true)
    addPackingTypeMutation(data)
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
            options={packingTypeOptions || []}
            isLoading={mainIsLoading}
            name={'packingType'}
            label={'Packing Type'}
            placeholder={'Select Packing Type'}
            optionsMessage={'No Packing Type Found...'}
          />
        </div>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Packing Type</DialogTitle>
          </DialogHeader>

          <form onSubmit={packingTypeHandleSubmit(packingTypeOnSubmit)}>
            <div className='mt-4 space-y-8'>
              <Input
                id='name'
                label='Packing Type'
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

export default PackingType