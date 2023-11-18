import React, { useEffect, useMemo, useState } from 'react'
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
import InvoiceSummary from './InvoiceSummary'
import calculateBill from '../../../lib/CalculateBill'



const PurchaseForm = ({ accounts, products }) => {
   const [isLoading, setIsLoading] = useState(false)
   const [invoiceData, setInvoiceData] = useState([])

   const completeResetValues = {
      productId: '',
      qty1: 0,
      qty2: 0,
      totalQty: 0,
      rate: 0,
      discount: 0,
      discountType: '%',
      scheme: 0,
      schemeUnit: 'box',
      total: 0,
   }

   let formDefaultValues = {
      productId: '',
      qty1: 0,
      qty2: 0,
      totalQty: 0,
      rate: 0,
      discount: 0,
      discountType: '%',
      scheme: 0,
      schemeUnit: 'box',
      total: 0,
   }

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
      productId: Yup.string().required('Please select a product'),
      qty1: Yup.number().typeError("Must be a number").required('Please enter a qty1'),
      qty2: Yup.number().typeError("Must be a number").required('Please enter a qty2'),
      totalQty: Yup.number().typeError("Must be a number").required('Please enter a Total Quantity'),
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
      setInvoiceData((prevState) => [...prevState, data])
      reset(formDefaultValues)
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

   const discountTypeOptions = [{ label: "%", value: "%" }, { label: "Rs", value: "rs" }]

   const schemeUnitOptions = [{ label: "Carton", value: "carton" }, { label: "Box", value: "box" }]

   const productFilterOption = (option, inputValue) => {
      const { label, data: { key } } = option;
      const searchValue = inputValue.toLowerCase();
      return (
         label?.toLowerCase().includes(searchValue) || key.toString().includes(searchValue)
      );
   };


   // All the realtime Calculations
   const productId = useWatch({ control, name: 'productId' })
   const qty1 = parseInt(useWatch({ control, name: 'qty1' })) || 0
   const qty2 = parseInt(useWatch({ control, name: 'qty2' })) || 0
   let rate = parseFloat(useWatch({ control, name: 'rate' })) || 0
   const discount = parseFloat(useWatch({ control, name: 'discount' })) || 0
   const discountType = useWatch({ control, name: 'discountType' })

   useEffect(() => {
      const { total, totalQty } = calculateBill(products, productId, qty1, qty2, rate, discount, discountType)
      setValue('total', total.toFixed(2) || 0)
      setValue('totalQty', totalQty || 0)
   }, [productId, qty1, qty2, rate, discount, discountType])

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

         <div className='w-full border rounded-md my-7'>
            <Table className="text-md">
               <TableHeader>
                  <TableRow>
                     <TableHead>Product</TableHead>
                     <TableHead>Qty/Carton</TableHead>
                     <TableHead>Qty/Box</TableHead>
                     <TableHead>Total Quantity</TableHead>
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
                           name={'productId'}
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
                           id='totalQty'
                           type='text'
                           register={register}
                           errors={errors}
                           disabled={true}
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
                  <InvoiceItems invoiceData={invoiceData} products={products} />
               </TableBody>
            </Table>
         </div>
         <InvoiceSummary invoiceData={invoiceData} products={products} />
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