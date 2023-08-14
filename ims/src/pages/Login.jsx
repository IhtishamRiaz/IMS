import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from '../components/Input';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const URL = import.meta.env.VITE_API_URL;

    // Yup Validation Schema
    const loginSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Please enter your email'),
        password: Yup.string().required('Please enter your password'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data) => {
        setIsLoading(true);
        axios
            .post(`${URL}/login`, data)
            .then((res) => {
                toast.success(res.data.message);
                sessionStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`);
                sessionStorage.setItem('userId', res.data.userId);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className="flex flex-col justify-center min-h-screen px-3 py-12 bg-gray-100 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* <Image
                    alt="Logo"
                    height="48"
                    width="48"
                    className="w-auto mx-auto"
                    src="/images/logo-color.png"
                /> */}
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                    Log in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white rounded-lg shadow sm:px-10">
                    <form
                        className="space-y-7"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Form Inputs */}

                        <Input
                            id="email"
                            label="Email address"
                            type="email"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                            required
                        />

                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                            required
                        />

                        <section>
                            <Button
                                type="submit"
                                fullWidth
                                isLoading={isLoading}
                            >
                                Login
                            </Button>
                        </section>
                    </form>

                    <div className="flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500">
                        <div>New To ConnectX?</div>
                        <div className="underline cursor-pointer">
                            <Link to={'/register'}>
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;