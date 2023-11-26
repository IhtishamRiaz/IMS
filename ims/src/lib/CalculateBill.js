
const calculateBill = (products, product, cartons, boxes, rate, discount, discountType) => {

   const selectedProduct = products?.find((prod) => prod?._id === product)

   const calculateRate = () => {
      return rate / selectedProduct?.packingSize
   }

   const calculateTotalItems = () => {
      return boxes + cartons * selectedProduct?.packingSize
   }

   const calculateSubTotal = () => {
      const totalItems = calculateTotalItems()
      const rate = calculateRate()

      return totalItems * rate
   }

   const calculateDiscount = () => {
      const totalItems = calculateTotalItems();
      const rate = calculateRate()

      if (totalItems === 0) {
         return 0;
      }

      if (discountType === '%') {
         return Math.round((discount / 100) * totalItems * rate)
      } else {
         return discount
      }
   }

   const calculateTotal = () => {
      const discountAmount = calculateDiscount();
      const subTotal = calculateSubTotal();

      return subTotal - discountAmount
   }

   return {
      totalQty: calculateTotalItems(),
      discountAmount: calculateDiscount(),
      subTotal: calculateSubTotal(),
      total: calculateTotal(),
   }
}

export default calculateBill