import React, { useEffect } from 'react'
import calculateBill from '../../../lib/CalculateBill.js'
import Input from '../../../components/Input.jsx';

const InvoiceSummary = ({ invoiceData, products }) => {

   const [data, setData] = React.useState({
      subTotal: 0,
      discountAmount: 0,
      total: 0,
      adjustment: 0,
      adjustmentType: 'self',
      remarks: '',
   })

   let subTotal = 0, discountAmount = 0, total = 0;

   invoiceData?.forEach(item => {
      const { productId, qty1, qty2, rate, discount, discountType, } = item

      const calculationResult = calculateBill(products, productId, qty1, qty2, rate, discount, discountType)

      subTotal += calculationResult?.subTotal
      discountAmount += calculationResult?.discountAmount
      total += calculationResult?.total
   })

   total = total + data.adjustment

   useEffect(() => {
      setData({ ...data, subTotal, discountAmount, total })
   }, [total, subTotal, discountAmount])

   const handleAdjustmentChange = (e) => {
      setData({ ...data, adjustmentType: e })
   }
   const handleAdjustmentValueChange = (e) => {
      setData({ ...data, adjustment: parseFloat(e.target.value) || 0 })
   }
   const handleAdjustmentRemarkChange = (e) => {
      setData({ ...data, remarks: e.target.value })
   }

   const handleReset = () => {
      setData({
         subTotal: 0,
         discountAmount: 0,
         total: 0,
         adjustment: 0,
         adjustmentType: 'self',
         remarks: '',
      })
   }

   return (
      <div className='flex justify-end pr-5'>
         <div className='space-y-5'>
            <div className='flex'>
               <p className='w-32 font-bold'>Sub Total</p>
               <p className='font-medium text-right w-44'>{subTotal.toFixed(2)} Rs</p>
            </div>
            <div className='flex'>
               <p className='w-32 font-bold'>Discount</p>
               <p className='font-medium text-right w-44'>{discountAmount.toFixed(2)} Rs</p>
            </div>
            <div className='flex items-center'>
               <p className='w-32 font-bold'>Adjustment</p>
               <p className='font-medium text-right w-44'>
                  <Input type="text" value={data.adjustment} onChange={(e) => handleAdjustmentValueChange(e)} className='w-16 py-1 ml-auto' />
               </p>
            </div>
            <div className='flex items-center'>
               <p className='w-32 font-bold'>Remarks</p>
               <p className='font-medium text-right w-44'>
                  <Input type="text" value={data.adjustmentRemarks} fullWidth={true} onChange={(e) => handleAdjustmentRemarkChange(e)} className='py-1 ml-auto' />
               </p>
            </div>
            <div className='flex'>
               <p className='w-32 font-bold'>Grand Total</p>
               <p className='font-medium text-right w-44'>{total.toFixed(2)} Rs</p>
            </div>
         </div>
      </div>
   )
}

export default InvoiceSummary