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

const City = ({ Controller: MainController, control: mainControl, errors: mainErrors, isLoading: mainIsLoading }) => {

    const [isLoading, setIsLoading] = useState(false);

    // Yup Validation Schema
    const citySchema = Yup.object({
        name: Yup.string().required('Please enter a City'),
        areaId: Yup.string().required('Please select Area'),
    });

    const { register, handleSubmit: cityHandleSubmit, control, formState: { errors } } = useForm({
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
    };

    const cityOptions = [
        { value: "سرگودھا", label: "سرگودھا", }
    ]

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
                        Controller={MainController}
                        control={mainControl}
                        errors={mainErrors}
                        options={cityOptions}
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

                    <form onSubmit={cityHandleSubmit(cityOnSubmit)} className='mt-4 space-y-8'>
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

                        <Button type={'submit'} isLoading={isLoading}>
                            Add
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default City