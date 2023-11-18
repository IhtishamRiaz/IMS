
const calculateBill = (products, productId, qty1, qty2, rate, discount, discountType) => {

   const selectedProduct = products?.find((prod) => prod?._id === productId)

   const calculateRate = () => {
      return rate / selectedProduct?.packingSize
   }

   const calculateTotalItems = () => {
      return qty2 + qty1 * selectedProduct?.packingSize
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