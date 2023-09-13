import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from '../../../components/Button';
import City from './City'
import AccountType from './AccountType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast'
import { useAccountStore } from '../store/productStore';


const ProductForm = ({ accounts }) => {
  const [isLoading, setIsLoading] = useState(false)

  const completeResetValues = {
    name: '',
  }

  let formDefaultValues = {
    name: '',
  }

  // Yup Validation Schema
  const productSchema = Yup.object({
    name: Yup.string().required('Please enter a name'),
  });

  const { register, handleSubmit: mainHandleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: formDefaultValues
  });

  // On Submit
  const mainOnSubmit = (data) => {
    setIsLoading(true)
    console.log(data);
  }

  return (
    <div className='px-4 py-6 my-5 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold'>
        Add new Product
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