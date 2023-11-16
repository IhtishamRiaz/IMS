import React from 'react'
import calculateBill from '../../../lib/CalculateBill.js'

const InvoiceSummary = ({ invoiceData, products }) => {

   let subTotal = 0, discountAmount = 0, schemeAmount = 0, total = 0;

   invoiceData?.forEach(item => {
      const { productId, qty1, qty2, rate, discount, discountType, scheme, schemeUnit } = item

      const calculationResult = calculateBill(products, productId, qty1, qty2, rate, discount, discountType, scheme, schemeUnit)

      subTotal += calculationResult?.subTotal
      discountAmount += calculationResult?.discountAmount
      schemeAmount += calculationResult?.schemeAmount
      total += calculationResult?.total
   })

   return (
      <div className='flex justify-end'>
         <div className='flex pr-5'>
            <span className='min-w-[100px] font-bold leading-8'>
               <p>Sub Total</p>
               <p>Discount</p>
               <p>Scheme</p>
               <p>Total</p>
            </span>
            <span className='min-w-[80px] text-right font-medium leading-8'>
               <p>{subTotal.toFixed(2)} Rs</p>
               <p>{discountAmount.toFixed(2)} Rs</p>
               <p>{schemeAmount.toFixed(2)} Rs</p>
               <p>{total.toFixed(2)} Rs</p>
            </span>
         </div>
      </div>
   )
}

export default InvoiceSummary