import React, { useState } from 'react'
import Select from '../../../components/Select'
import { Plus as PlusCircle } from 'lucide-react'
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Input from '../../../components/Input'
import * as Yup from "yup"
import Button from '../../../components/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../../components/ui/dialog"
import Area from './Area'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import toast from 'react-hot-toast'
import { capitalizeFirstWord } from '../../../lib/utils'

const City = ({ Controller: MainController, control: mainControl, errors: mainErrors, isLoading: mainIsLoading }) => {

  // API Functions
  const axiosPrivate = useAxiosPrivate()

  // Add new City
  const addCity = async (data) => {
    return await axiosPrivate
      .post('/address/city', data)
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

  // Get all Cities
  const getAllCities = async () => {
    const response = await axiosPrivate.get('/address/city')
    return response.data
  }

  // React Queries
  const queryClient = useQueryClient();

  const { isError, error, isLoading: isCitiesLoading, data: cities } = useQuery(['cities'], getAllCities)

  const addCityMutation = useMutation(addCity, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cities'])
    }
  })

  const [isLoading, setIsLoading] = useState(false);

  // Yup Validation Schema
  const citySchema = Yup.object({
    name: Yup.string().required('Please enter a City'),
    areaId: Yup.string(),
  });

  const { register, handleSubmit: cityHandleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(citySchema),
    defaultValues: {
      name: '',
      areaId: ''
    }
  });

  // On Submit
  const cityOnSubmit = (data) => {
    console.log("🚀 ~ file: Address.jsx:35 ~ cityOnSubmit ~ data:", data)
    setIsLoading(true)
    addCityMutation.mutate(data)
  };

  const cityOptions = cities?.map(city => {
    return {
      value: city._id,
      label: capitalizeFirstWord(city.name)
    }
  })

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
            Controller={MainController}
            control={mainControl}
            errors={mainErrors}
            options={cityOptions || []}
            isLoading={mainIsLoading}
            name={'city'}
            label={'City'}
            placeholder={'Select City'}
            optionsMessage={'No City Found...'}
          />
        </div>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new City</DialogTitle>
          </DialogHeader>

          <form onSubmit={cityHandleSubmit(cityOnSubmit)} id="city-form"></form>
          <div className='space-y-4'>
            <Input
              id='name'
              label='City Name'
              type='text'
              register={register}
              errors={errors}
              disabled={isLoading}
              required
            />

            <Area
              Controller={Controller}
              control={control}
              errors={errors}
              isLoading={isLoading}
            />
          </div>

          <Button
            type={'submit'}
            isLoading={isLoading}
            form="city-form"
          >
            Add
          </Button>

        </DialogContent>
      </Dialog>
    </>
  )
}

export default City