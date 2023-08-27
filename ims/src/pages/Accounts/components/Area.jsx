import React, { useState } from 'react'
import Select from '../../../components/Select'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { Plus as PlusCircle } from 'lucide-react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../../components/ui/dialog"

const Area = ({ Controller: CityController, control: cityControl, errors: cityErrors, isLoading: cityIsLoading }) => {
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
        setIsLoading(true)
    };

    const areaOptions = [{ value: 'fsfdrwefsdf', label: 'Punjab' }]
    return (
        <>
            <Dialog>

                <div className='relative'>
                    <div className='absolute flex items-center p-1 bg-gray-100 rounded-lg cursor-pointer top-7 left-60 hover:bg-gray-200 text-brand-700'>
                        <DialogTrigger>
                            <PlusCircle size={20} />
                        </DialogTrigger>
                    </div>
                    <Select
                        Controller={CityController}
                        control={cityControl}
                        errors={cityErrors}
                        options={areaOptions}
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