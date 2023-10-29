import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import Button from '../../../components/Button'
import Category from './Category.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { toast } from 'sonner'
import { usePurchaseStore } from '../store/purchaseStore'
import { capitalizeEachFirstWord } from '../../../lib/utils'


const PurchaseForm = ({ accounts, products }) => {
  const [isLoading, setIsLoading] = useState(false)

  const completeResetValues = {
    name: '',
    seller: '',
  }

  let formDefaultValues = {
    name: '',
    seller: '',
  }

  const invoiceData = [
    {
      id: 1,
      product: 'Bisconi',
      qty1: '5',
      qty2: '2',
      rate: '650',
      discount: '10%',
      scheme: '0',
      total: '6500',
    },
    {
      id: 2,
      product: 'Bisconi',
      qty1: '5',
      qty2: '2',
      rate: '650',
      discount: '10%',
      scheme: '0',
      total: '6500',
    },
  ]

  // API Functions
  const axiosPrivate = useAxiosPrivate()
  const addPurchase = async (data) => {
    axiosPrivate.post('/purchase', data)
      .then((res) => {
        toast.success(res?.data?.message)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      })
      .finally(() => {
        setIsLoading(false)
        reset(completeResetValues)
      })
  }

  // React Queries

  const queryClient = useQueryClient()

  // const { mutate: addProductMutation } = useMutation({
  //   mutationFn: addProduct,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['products'])
  //     queryClient.refetchQueries(['products'])
  //   }
  // })


  // Yup Validation Schema
  const productSchema = Yup.object({
    name: Yup.string().required('Please enter a name'),
    seller: Yup.string().required('Please select a seller'),
  });

  const { register, handleSubmit: mainHandleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: formDefaultValues
  });

  // On Submit
  const mainOnSubmit = (data) => {
    // setIsLoading(true)
    console.log(data);
  }

  // Get all Suppliers and Products
  const allSupplierAccounts = accounts?.filter((acc) => {
    return acc.accountType?.name === 'supplier'
  })

  const productOptions = products?.map((prod) => {
    return {
      value: prod._id,
      label: prod.name,
      key: prod.productId
    }
  })

  const supplierOptions = allSupplierAccounts?.map(sup => {
    return {
      value: sup._id,
      label: sup.name
    }
  })

  const productFilterOption = (option, inputValue) => {
    const { label, data: { key } } = option;
    const searchValue = inputValue.toLowerCase();
    return (
      label?.toLowerCase().includes(searchValue) || key.toString().includes(searchValue)
    );
  };

  return (
    <div className='px-4 py-6 my-5 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold'>
        Create Purchase Invoice
      </h2>

      <form onSubmit={mainHandleSubmit(mainOnSubmit)} id='main-form' className='mt-4 space-y-3'></form>
      <div>
        <Select
          Controller={Controller}
          control={control}
          errors={errors}
          options={supplierOptions || []}
          isLoading={isLoading}
          name={'supplier'}
          label={'Supplier'}
          placeholder={'Select Supplier'}
          optionsMessage={'No Supplier Found...'}
        />
        <table className='w-full my-7'>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty/Carton</th>
              <th>Qty/Box</th>
              <th>Rate</th>
              <th>Discount</th>
              <th>Scheme</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Select
                  Controller={Controller}
                  control={control}
                  errors={errors}
                  options={productOptions || []}
                  isLoading={isLoading}
                  name={'product'}
                  placeholder={'Select Product'}
                  optionsMessage={'No Product Found...'}
                  filterOption={productFilterOption}
                />
              </td>
              <td>
                <Input
                  id='qty1'
                  type='text'
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                  required
                  className={'w-full'}
                />
              </td>
              <td>
                <Input
                  id='qty2'
                  type='text'
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                  required
                  className={'w-full'}
                />
              </td>
              <td>
                <Input
                  id='rate'
                  type='text'
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                  required
                  className={'w-full'}
                />
              </td>
              <td>
                <Input
                  id='discount'
                  type='text'
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                  required
                  className={'w-full'}
                />
              </td>
              <td>
                <Input
                  id='scheme'
                  type='text'
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                  required
                  className={'w-full'}
                />
              </td>
              <td>
                <Input
                  id='total'
                  type='text'
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                  required
                  className={'w-full'}
                />
              </td>
            </tr>
            {invoiceData?.map(item => (
              <tr key={item._id}>
                <td>{item.product}</td>
                <td>{item.qty1}</td>
                <td>{item.qty2}</td>
                <td>{item.rate}</td>
                <td>{item.discount}</td>
                <td>{item.scheme}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

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

export default PurchaseForm