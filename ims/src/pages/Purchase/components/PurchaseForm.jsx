import React, { useEffect, useMemo, useState } from 'react'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import { useForm, Controller, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import Button from '../../../components/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import SimpleSelect from '../../../components/SimpleSelect'
import { usePurchaseStore } from '../store/purchaseStore'

const PurchaseForm = ({ accounts, products }) => {

   const selectedPurchase = usePurchaseStore((state) => state.selectedPurchase)
   const setSelectedPurchase = usePurchaseStore((state) => state.setSelectedPurchase)
   const mode = usePurchaseStore((state) => state.mode)
   const setMode = usePurchaseStore((state) => state.setMode)

   const [isLoading, setIsLoading] = useState(false)
   const [invoiceData, setInvoiceData] = useState({
      supplier: '',
      subTotal: 0,
      discountAmount: 0,
      grandTotal: 0,
      remarks: '',
      adjustment: 0,
      adjustmentSource: 'self',
      items: [],
   })

   useEffect(() => {
      setInvoiceData({
         supplier: selectedPurchase?.supplier?._id || '',
         subTotal: selectedPurchase?.subTotal || 0,
         discountAmount: selectedPurchase?.discountAmount || 0,
         grandTotal: selectedPurchase?.grandTotal || 0,
         remarks: selectedPurchase?.remarks || '',
         adjustment: selectedPurchase?.adjustment || 0,
         adjustmentSource: selectedPurchase?.adjustmentSource || 'self',
         items: selectedPurchase?.items || [],
      })
   }, [selectedPurchase])

   const completeResetValues = {
      product: '',
      cartons: 0,
      boxes: 0,
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

   const addPurchaseInvoice = async (data) => {
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

   const { mutate: addPurchaseMutation } = useMutation({
      mutationFn: addPurchaseInvoice,
      onSuccess: () => {
         queryClient.invalidateQueries(['purchases'])
         queryClient.refetchQueries(['purchases'], { force: true })
      }
   })

   // Yup Validation Schema
   const PurchaseInvoiceSchema = Yup.object({
      product: Yup.string().required('Please select a product'),
      cartons: Yup.number().typeError("Must be a number").required('Please enter a cartons'),
      boxes: Yup.number().typeError("Must be a number").required('Please enter a boxes'),
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
      defaultValues: completeResetValues
   });

   // On Submit
   const mainOnSubmit = (data) => {
      data._id = Math.random().toString(36).slice(2, 9) + Date.now()
      setInvoiceData((prevState) => ({
         ...prevState,
         items: [...prevState.items, data]
      }))
      reset(completeResetValues)
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
   const product = useWatch({ control, name: 'product' })
   const cartons = parseInt(useWatch({ control, name: 'cartons' })) || 0
   const boxes = parseInt(useWatch({ control, name: 'boxes' })) || 0
   let rate = parseFloat(useWatch({ control, name: 'rate' })) || 0
   const discount = parseFloat(useWatch({ control, name: 'discount' })) || 0
   const discountType = useWatch({ control, name: 'discountType' })

   useEffect(() => {
      const { total, totalQty } = calculateBill(products, product, cartons, boxes, rate, discount, discountType)
      setValue('total', total.toFixed(2) || 0)
      setValue('totalQty', totalQty || 0)
   }, [product, cartons, boxes, rate, discount, discountType])

   // Api Call
   const submitInvoice = () => {
      setIsLoading(true)

      if (!invoiceData.supplier) {
         toast.error("Please select a supplier")
         setIsLoading(false)
         return
      }

      if (!invoiceData.items.length) {
         toast.error("Please add items")
         setIsLoading(false)
         return
      }

      addPurchaseMutation(invoiceData)
      setInvoiceData({
         supplier: '',
         subTotal: 0,
         discountAmount: 0,
         grandTotal: 0,
         remarks: '',
         adjustment: 0,
         adjustmentSource: 'self',
         items: [],
      })
   }

   const resetForm = () => {
      reset(completeResetValues)
      setInvoiceData({
         supplier: '',
         subTotal: 0,
         discountAmount: 0,
         grandTotal: 0,
         remarks: '',
         adjustment: 0,
         adjustmentSource: 'self',
         items: [],
      })
      setMode('')
      setSelectedPurchase(null)
      setIsLoading(false)
   }

   useEffect(() => {
      if (mode === "view") {
         setIsLoading(true)
      }
   }, [mode])

   return (
      <div className='px-4 py-6 my-5 bg-white rounded-lg shadow-md'>
         <h2 className='text-2xl font-bold'>
            Create Purchase Invoice
         </h2>

         <SimpleSelect
            options={supplierOptions || []}
            isLoading={isLoading}
            label={'Supplier'}
            name={'supplier'}
            placeholder={'Select Supplier'}
            optionsMessage={'No Supplier Found...'}
            value={invoiceData.supplier}
            onChange={(e) => setInvoiceData((prevState) => ({ ...prevState, supplier: e.value }))}
         />

         <form onSubmit={mainHandleSubmit(mainOnSubmit)} id='main-form' className='mt-4 space-y-3'></form>

         <div className='border rounded-md my-7'>
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
                           name={'product'}
                           placeholder={'Select Product'}
                           optionsMessage={'No Product Found...'}
                           filterOption={productFilterOption}
                        />
                     </TableCell>
                     <TableCell>
                        <Input
                           id='cartons'
                           type='text'
                           register={register}
                           errors={errors}
                           disabled={isLoading}
                           required
                           className={'max-w-28 w-full'}
                        />
                     </TableCell>
                     <TableCell>
                        <Input
                           id='boxes'
                           type='text'
                           register={register}
                           errors={errors}
                           disabled={isLoading}
                           required
                           className={'max-w-28 w-full'}
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
                           className={'max-w-28 w-full'}
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
                           className={'max-w-28 w-full'}
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
                           className={'max-w-28 w-full'}
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
                           className={'max-w-28 w-full'}
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
                           className={'w-40'}
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
                           className={'max-w-28 w-full'}
                        />
                     </TableCell>
                     <TableCell>
                        <Button
                           ghost
                           type='submit'
                           form={'main-form'}
                           disabled={isLoading}
                        >
                           <PlusCircle size={20} />
                        </Button>
                     </TableCell>
                  </TableRow>
                  <InvoiceItems invoiceData={invoiceData} setInvoiceData={setInvoiceData} products={products} reset={reset} />
               </TableBody>
            </Table>
         </div>
         <InvoiceSummary products={products} invoiceData={invoiceData} setInvoiceData={setInvoiceData} isLoading={isLoading} />
         {
            mode !== "view" && (
               <Button
                  isLoading={isLoading}
                  onClick={submitInvoice}
               >
                  Submit Invoice
               </Button>
            )
         }
         {
            mode && <Button danger onClick={resetForm} >Exit {mode}</Button>
         }
      </div>
   )
}

export default PurchaseForm