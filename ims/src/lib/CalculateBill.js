
const calculateBill = (products, productId, qty1, qty2, rate, discount, discountType, scheme, schemeUnit) => {

   const selectedProduct = products?.find((prod) => prod?._id === productId)

   rate = rate / selectedProduct?.packingSize

   const calculateTotalItems = () => {
      return qty2 + qty1 * selectedProduct?.packingSize
   }

   const calculateSubTotal = () => {
      const totalItems = calculateTotalItems();

      return totalItems * rate
   }

   const calculateDiscount = () => {
      const totalItems = calculateTotalItems();

      if (totalItems === 0) {
         return 0;
      }

      if (discountType === '%') {
         return Math.round((discount / 100) * totalItems * rate)
      } else {
         return discount
      }
   }

   const calculateScheme = () => {
      if (schemeUnit === 'box') {
         return scheme * rate
      }
      else if (schemeUnit === 'carton') {
         return scheme * rate * selectedProduct?.packingSize
      }
   }

   const calculateTotal = () => {
      const totalItems = calculateTotalItems();
      const discountAmount = calculateDiscount();
      const schemeAmount = calculateScheme();
      const subTotal = calculateSubTotal();

      return subTotal - discountAmount - schemeAmount

      // if (discountAmount && schemeAmount) {
      //    return totalItems * rate - discountAmount - schemeAmount
      // }
      // else if (discountAmount) {
      //    return totalItems * rate - discountAmount
      // }
      // else if (schemeAmount) {
      //    return totalItems * rate - schemeAmount
      // }
      // else {
      //    return totalItems * rate
      // }
   }

   return {
      totalItems: calculateTotalItems(),
      discountAmount: calculateDiscount(),
      schemeAmount: calculateScheme(),
      subTotal: calculateSubTotal(),
      total: calculateTotal(),
   }
}

export default calculateBill