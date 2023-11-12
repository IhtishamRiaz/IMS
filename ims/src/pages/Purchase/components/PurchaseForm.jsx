import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import { useForm, Controller, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import Button from '../../../components/Button'
import { useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { toast } from 'sonner'
import { cn } from '../../../lib/utils'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "../../../components/ui/table"
import { Plus as PlusCircle } from 'lucide-react'
import InvoiceItems from './InvoiceItems'



const PurchaseForm = ({ accounts, products }) => {
   const [isLoading, setIsLoading] = useState(false)

   const completeResetValues = {
      product: '',
      qty1: 0,
      qty2: '',
      rate: 0,
      discount: '',
      discountType: 'percent',
      scheme: '',
      schemeUnit: 'box',
      total: 0,
   }

   let formDefaultValues = {
      product: '',
      qty1: 0,
      qty2: '',
      rate: 0,
      discount: '',
      discountType: 'percent',
      scheme: '',
      schemeUnit: 'box',
      total: 0,
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
         schemeUnit: 'box',
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
         schemeUnit: 'box',
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
   const PurchaseInvoiceSchema = Yup.object({
      product: Yup.string().required('Please select a product'),
      qty1: Yup.number().typeError("Must be a number").required('Please enter a qty1'),
      qty2: Yup.number().typeError("Must be a number").required('Please enter a qty2'),
      rate: Yup.number().typeError("Must be a number").required('Please enter a rate'),
      discount: Yup.number().typeError("Must be a number").required('Please enter a discount'),
      discountType: Yup.string().required('Please select a type'),
      scheme: Yup.number().typeError("Must be a number").required('Please enter a scheme'),
      schemeUnit: Yup.string().required('Please select a unit'),
      total: Yup.number().typeError("Must be a number").required('Please enter total'),
   });

   const { register, handleSubmit: mainHandleSubmit, control, formState: { errors }, reset, setValue } = useForm({
      resolver: yupResolver(PurchaseInvoiceSchema),
      defaultValues: formDefaultValues
   });

   // On Submit
   const mainOnSubmit = (data) => {
      console.log("🚀 ~ file: PurchaseForm.jsx:129 ~ mainOnSubmit ~ data:", data)
      // setIsLoading(true)
   }

   // Get all Suppliers and Products
   const allSupplierAccounts = accounts?.filter((acc) => {
      return acc.accountType?.name === 'supplier'
   })

   // React Select Options
   const supplierOptions = allSupplierAccounts?.map(sup => {
      return {
         value: sup._id,
         label: sup.name
      }
   })

   const productOptions = products?.map((prod) => {
      return {
         value: prod._id,
         label: prod.name,
         key: prod.productId
      }
   })
   const discountTypeData = [{ label: "%", value: "percent" }, { label: "Rs", value: "amount" }]
   const discountTypeOptions = discountTypeData?.map((item) => {
      return {
         label: item.label,
         value: item.value,
      }
   })

   const schemeUnitData = [{ label: "Carton", value: "carton" }, { label: "Box", value: "box" }]
   const schemeUnitOptions = schemeUnitData?.map((item) => {
      return {
         label: item.label,
         value: item.value,
      }
   })

   const productFilterOption = (option, inputValue) => {
      const { label, data: { key } } = option;
      const searchValue = inputValue.toLowerCase();
      return (
         label?.toLowerCase().includes(searchValue) || key.toString().includes(searchValue)
      );
   };


   // All the realtime form Calculation
   const [total, setTotal] = useState(0)

   const discountType = useWatch({ control, name: 'discountType' })
   const discount = useWatch({ control, name: 'discount' })
   const qty1 = useWatch({ control, name: 'qty1' })
   const rate = useWatch({ control, name: 'rate' })

   const calculateDiscount = () => {
      if (discountType === 'percent') {
         return Math.round((discount / 100) * total)
      } else {
         return parseInt(discount)
      }
   }

   useEffect(() => {
      setValue('total', qty1 * rate)
      setTotal(qty1 * rate)
   }, [qty1, rate])

   useEffect(() => {
      setValue('total', total - calculateDiscount())
   }, [discount, discountType])

   // console.log("Total=> " + total);
   return (
      <div className='px-4 py-6 my-5 bg-white rounded-lg shadow-md'>
         <h2 className='text-2xl font-bold'>
            Create Purchase Invoice
         </h2>

         {/* <Select
            Controller={Controller}
            control={control}
            errors={errors}
            options={supplierOptions || []}
            isLoading={isLoading}
            name={'supplier'}
            label={'Supplier'}
            placeholder={'Select Supplier'}
            optionsMessage={'No Supplier Found...'}
         /> */}

         <form onSubmit={mainHandleSubmit(mainOnSubmit)} id='main-form' className='mt-4 space-y-3'></form>

         <div className='w-full my-7 border rounded-md'>
            <Table className="text-md">
               <TableHeader>
                  <TableRow>
                     <TableHead>Product</TableHead>
                     <TableHead>Qty/Carton</TableHead>
                     <TableHead>Qty/Box</TableHead>
                     <TableHead>Rate</TableHead>
                     <TableHead>Discount</TableHead>
                     <TableHead></TableHead>
                     <TableHead>Scheme</TableHead>
                     <TableHead>Total</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody className={cn("[&_tr:last-child]:border-0")}>
                  <TableRow>
                     <TableCell>
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
                     </TableCell>
                     <TableCell>
                        <Input
                           id='qty1'
                           type='text'
                           register={register}
                           errors={errors}
                           disabled={isLoading}
                           required
                           className={'w-28'}
                        />
                     </TableCell>
                     <TableCell>
                        <Input
                           id='qty2'
                           type='text'
                           register={register}
                           errors={errors}
                           disabled={isLoading}
                           required
                           className={'w-28'}
                        />
                     </TableCell>
                     <TableCell>
                        <Input
                           id='rate'
                           type='text'
                           register={register}
                           errors={errors}
                           disabled={isLoading}
                           required
                           className={'w-28'}
                        />
                     </TableCell>
                     <TableCell className='flex gap-2'>
                        <Input
                           id='discount'
                           type='text'
                           register={register}
                           errors={errors}
                           disabled={isLoading}
                           required
                           className={'w-28'}
                        />
                        <Select
                           Controller={Controller}
                           control={control}
                           errors={errors}
                           options={discountTypeOptions || []}
                           isLoading={isLoading}
                           name={'discountType'}
                           placeholder={'Type'}
                           optionsMessage={'No Discount Type'}
                           className={'w-28'}
                        />
                     </TableCell>
                     <TableCell></TableCell>
                     <TableCell className='flex gap-2'>
                        <Input
                           id='scheme'
                           type='text'
                           register={register}
                           errors={errors}
                           disabled={isLoading}
                           required
                           className={'w-28'}
                        />
                        <Select
                           Controller={Controller}
                           control={control}
                           errors={errors}
                           options={schemeUnitOptions || []}
                           isLoading={isLoading}
                           name={'schemeUnit'}
                           placeholder={'Unit'}
                           optionsMessage={'No Scheme Unit Found...'}
                           className={'w-28'}
                        />
                     </TableCell>
                     <TableCell>
                        <Input
                           id='total'
                           type='text'
                           register={register}
                           errors={errors}
                           disabled={true}
                           required
                           className={'w-28'}
                        />
                     </TableCell>
                     <TableCell>
                        <Button
                           ghost
                           type='submit'
                           form={'main-form'}
                        >
                           <PlusCircle size={20} />
                        </Button>
                     </TableCell>
                  </TableRow>
                  <InvoiceItems invoiceData={invoiceData} />
               </TableBody>
            </Table>
         </div>
         {/* <Button
               type='submit'
               isLoading={isLoading}
               form={'main-form'}
            >
               Add Account
            </Button> */}

      </div>
   )
}

export default PurchaseForm