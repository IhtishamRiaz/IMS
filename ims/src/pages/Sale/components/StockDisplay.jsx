import React from 'react'

const StockDisplay = ({ products, selectedProductId }) => {

   const selectedProduct = products.find(product => product._id === selectedProductId)
   const cartons = Math.floor(selectedProduct?.stock / selectedProduct?.packingSize) || 0
   const boxes = selectedProduct?.stock % selectedProduct?.packingSize || 0

   return (
      <div className='flex items-center gap-8'>
         <div className='flex flex-col items-center'>
            <p className='mb-1 font-semibold'>Cartons</p>
            <div className='flex items-center justify-center w-12 h-10 font-bold text-green-800 bg-green-200 rounded-lg'>{cartons}</div>
         </div>
         <div className='flex flex-col items-center'>
            <p className='mb-1 font-semibold'>Boxes</p>
            <div className='flex items-center justify-center w-12 h-10 font-bold text-green-800 bg-green-200 rounded-lg'>{boxes}</div>
         </div>
      </div>
   )
}

export default StockDisplay