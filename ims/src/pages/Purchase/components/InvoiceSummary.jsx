import React, { useEffect } from 'react'
import calculateBill from '../../../lib/CalculateBill.js'
import Input from '../../../components/Input.jsx';
import SimpleSelect from '../../../components/SimpleSelect.jsx';
import Textarea from '../../../components/Textarea.jsx';

const InvoiceSummary = ({ invoiceItems, products, invoiceData, setInvoiceData }) => {

   let subTotal = 0, discountAmount = 0, total = 0;

   invoiceItems?.forEach(item => {
      const { productId, cartons, boxes, rate, discount, discountType, } = item

      const calculationResult = calculateBill(products, productId, cartons, boxes, rate, discount, discountType)

      subTotal += calculationResult?.subTotal
      discountAmount += calculationResult?.discountAmount
      total += calculationResult?.total
   })

   total = total + invoiceData.adjustment

   useEffect(() => {
      setInvoiceData((prev) => ({ ...prev, subTotal: +subTotal.toFixed(2), discount: +discountAmount.toFixed(2), total: +total.toFixed(2) }))
   }, [total, subTotal, discountAmount])

   const handleAdjustmentValueChange = (e) => {
      setInvoiceData((prev) => ({ ...prev, adjustment: parseFloat(e.target.value) || 0 }))
   }
   const handleAdjustmentRemarkChange = (e) => {
      setInvoiceData((prev) => ({ ...prev, remarks: e.target.value }))
   }

   const handleAdjustmentSourceChange = (e) => {
      setInvoiceData((prev) => ({ ...prev, adjustmentSource: e.value }))
   }

   const adjustmentOptions = [{ label: 'Self', value: 'self' }, { label: 'Company', value: 'company' }]

   return (
      <div className='flex justify-end pr-5'>
         <div className='space-y-5'>
            <div className='flex'>
               <p className='font-bold w-44'>Sub Total</p>
               <p className='font-medium text-right w-44'>{subTotal.toFixed(2)} Rs</p>
            </div>
            <div className='flex'>
               <p className='font-bold w-44'>Discount</p>
               <p className='font-medium text-right w-44'>{discountAmount.toFixed(2)} Rs</p>
            </div>
            <div className='flex items-center'>
               <p className='font-bold w-44'>Adjustment</p>
               <p className='font-medium text-right w-44'>
                  <Input
                     type="text"
                     value={invoiceData.adjustment}
                     onChange={(e) => handleAdjustmentValueChange(e)}
                     className='w-16 py-1 ml-auto'
                  />
               </p>
            </div>
            <div className='flex items-center'>
               <p className='font-bold w-44'>Adjustment Source</p>
               <p className='w-44'>
                  <SimpleSelect
                     value={invoiceData.adjustmentSource}
                     options={adjustmentOptions}
                     placeholder="Source"
                     optionsMessage="No Options"
                     onChange={handleAdjustmentSourceChange}
                     className={'w-full'}
                  />
               </p>
            </div>
            <div className='flex items-center'>
               <p className='font-bold w-44'>Remarks</p>
               <p className='font-medium text-right w-44'>
                  <Textarea
                     value={invoiceData.remarks}
                     fullWidth={true}
                     onChange={(e) => handleAdjustmentRemarkChange(e)}
                     className='ml-auto resize-none'
                  />
               </p>
            </div>
            <div className='flex'>
               <p className='font-bold w-44'>Grand Total</p>
               <p className='font-medium text-right w-44'>{total.toFixed(2)} Rs</p>
            </div>
         </div>
      </div>
   )
}

export default InvoiceSummary