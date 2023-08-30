import React, { useState } from 'react'
import Select from '../../../components/Select'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { Plus as PlusCircle } from 'lucide-react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAllAreas, addArea } from '../../../api/addressApi'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../../components/ui/dialog"

const Area = ({ Controller: CityController, control: cityControl, errors: cityErrors, isLoading: cityIsLoading }) => {
    // React Queries
    const queryClient = useQueryClient()

    const { isError, error, isLoading: isAreasLoading, data: areas } = useQuery('areas', getAllAreas)

    const addAreaMutation = useMutation(addArea, {
        onSuccess: () => {
            queryClient.invalidateQueries('areas')
        }
    })

    const [isLoading, setIsLoading] = useState(false);

    // Yup Validation Schema
    const accountSchema = Yup.object({
        name: Yup.string().required('Please enter an Area'),
    });

    const { register, handleSubmit: areaHandleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(accountSchema),
        defaultValues: {
            name: '',
        }
    });

    // On Submit
    const areaOnSubmit = (data) => {
        console.log("🚀 ~ file: index.jsx:51 ~ onSubmit ~ data:", data)
        addAreaMutation.mutate(data)
    };

    const areaOptions = areas?.map(area => {
        return {
            value: area._id,
            label: area.name
        }
    })
    return (
        <>
            <Dialog>

                <div className='relative'>
                    <div className='absolute flex items-center cursor-pointer top-7 left-60  text-brand-700'>
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