import React from 'react'
import Input from '../../../components/Input'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const AddArea = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Yup Validation Schema
    const accountSchema = Yup.object({
        name: Yup.string().required('Please enter a name'),
        type: Yup.string().required('Please select Account Type'),
        mobile: Yup.string().required('Please enter mobile'),
        city: Yup.string().required('Please enter city'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(accountSchema),
        defaultValues: {
            areaName: '',
        }
    });

    // On Submit
    const onSubmit = (data) => {
        console.log("🚀 ~ file: index.jsx:51 ~ onSubmit ~ data:", data)
        setIsLoading(true)
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id='areaName'
                    label='Add Area'
                    type='text'
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    required
                />
            </form>
        </>
    )
}

export default AddArea