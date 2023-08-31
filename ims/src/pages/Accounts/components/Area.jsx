import React, { useState } from 'react'
import Select from '../../../components/Select'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { Plus as PlusCircle } from 'lucide-react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../../components/ui/dialog"
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { capitalizeFirstWord } from '../../../lib/utils'
import toast from 'react-hot-toast'

const Area = ({ Controller: CityController, control: cityControl, errors: cityErrors, isLoading: cityIsLoading }) => {
  const [isLoading, setIsLoading] = useState(false)

  // API Functions
  const axiosPrivate = useAxiosPrivate()

  // Add new Area
  const addArea = async (data) => {
    return await axiosPrivate
      .post('/address/area', data)
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

  // Get all Areas
  const getAllAreas = async () => {
    const response = await axiosPrivate.get('/address/area')
    return response.data
  }

  // React Queries
  const queryClient = useQueryClient()

  const { isError, error, isLoading: isAreasLoading, data: areas } = useQuery('areas', getAllAreas)

  const addAreaMutation = useMutation(addArea, {
    onSuccess: () => {
      queryClient.invalidateQueries('areas')
    }
  })

  // Yup Validation Schema
  const accountSchema = Yup.object({
    name: Yup.string().required('Please enter an Area'),
  });

  const { register, handleSubmit: areaHandleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(accountSchema),
    defaultValues: {
      name: '',
    }
  });

  // On Submit
  const areaOnSubmit = (data) => {
    setIsLoading(true)
    addAreaMutation.mutate(data)
  };

  const areaOptions = areas?.map(area => {
    return {
      value: area._id,
      label: capitalizeFirstWord(area.name)
    }
  })

  const sampleData = [
    {
      name: 'Area 1',
      city: 'City 1'
    },
    {
      name: 'Area 2'
    },
    {
      name: 'Area 3',
      city: 'City 3'
    },
  ]
  const resultData = sampleData?.map(data => {
    return {
      names: data.name,
      cities: data.city || 'nil'
    }
  })
  console.log("🚀 ~ file: Area.jsx:104 ~ resultData ~ resultData:", resultData)

  return (
    <>
      <Dialog>

        <div className='relative'>
          <div className='absolute flex items-center cursor-pointer top-7 left-60 text-brand-700'>
            <DialogTrigger>
              <Button ghost>
                <PlusCircle size={20} />
              </Button>
            </DialogTrigger>
          </div>
          <Select
            Controller={CityController}
            control={cityControl}
            errors={cityErrors}
            options={areaOptions || []}
            isLoading={isLoading}
            name={'areaId'}
            label={'Area'}
            placeholder={'Select Area'}
            optionsMessage={'No Area Found...'}
          />
        </div>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new City</DialogTitle>
          </DialogHeader>

          <form onSubmit={areaHandleSubmit(areaOnSubmit)}>
            <div className='mt-4 space-y-8'>
              <Input
                id='name'
                label='Area Name'
                type='text'
                register={register}
                errors={errors}
                disabled={isLoading}
                required
              />

              <Button type={'submit'} isLoading={isLoading}>
                Add
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Area