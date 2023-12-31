import { Sale } from '../models/saleModel.js'
import { Product } from '../models/productModel.js'
import { Account } from '../models/accountModel.js'
import { validateNewSale } from '../validations/saleValidation.js'

const getNextSaleId = async () => {
   const maxSale = await Sale.findOne({}, {}, { sort: { saleId: -1 } });
   if (maxSale) {
      return maxSale.saleId + 1;
   }
   return 1;
}

const removeIdFromItems = (data) => {
   data?.items?.map((item) => {
      delete item._id;
   })
}


// Add product stock
const addProductStock = async (data) => {
   const insufficientStockProducts = [];
   await Promise.all(
      data?.items?.map(async (item) => {
         const product = await Product.findById(item.product)

         if (item.totalQty > product.stock) {
            insufficientStockProducts.push(product.name);
         } else {
            product.stock = product.stock - item.totalQty
            await product.save()
         }
      })
   )
   return insufficientStockProducts.length > 0
      ? `Insufficient Stock for ${insufficientStockProducts.join(', ').replace(/,([^,]+)$/, ' and$1')}`
      : null
}

// Delete product stock
const deleteProductStock = async (data) => {
   await Promise.all(
      data?.items?.map(async (item) => {
         const product = await Product.findById(item.product)
         product.stock = product.stock + item.totalQty
         await product.save()
      })
   )
}

// Updating Product Stock
const updateProductStock = async (data, previousPurchase) => {
   deleteProductStock(previousPurchase)
   const stockError = await addProductStock(data)
   if (stockError) return stockError
}

// Adding Account Balance
const addAccountBalance = async (data) => {
   const account = await Account.findById(data.customer)
   account.balance = account.balance + data.grandTotal
   await account.save()
}

// Deleting Account Balance
const deleteAccountBalance = async (data) => {
   const account = await Account.findById(data.customer)
   account.balance = account.balance - data.grandTotal
   await account.save()
}

// Updating Account Balance
const updateAccountBalance = async (data, previousPurchase) => {
   const account = await Account.findById(data.supplier)
   account.balance = account.balance - previousPurchase.grandTotal + data.grandTotal
   await account.save()
}


// @desc Add new Sale
// @route POST /sale
// @access Private
const addSale = async (req, res) => {
   try {
      // // Validating incoming data
      // const { error } = validateNewSale(req.body);
      // if (error) {
      //    return res.status(400).json({ message: error.details[0].message });
      //    return res.status(400).json({ message: 'Validation failed', error: error });
      // }

      const data = req.body

      const nextSaleId = await getNextSaleId()
      data.saleId = nextSaleId

      removeIdFromItems(data)

      const sale = await Sale.create(data)

      const stockError = await addProductStock(data)
      if (stockError) {
         return res.status(400).json({ message: stockError })
      }

      addAccountBalance(data)

      if (sale) {
         return res.status(201).json({ message: `New Sale Added!` })
      } else {
         return res.status(400).json({ message: 'Failed to Add Sale!' })
      }
   }
   catch (error) {
      return res.status(500).json({ message: 'Failed to Add Sale!', error })
   }
}

// @desc Get all Sales
// @route GET /sale
// @access Private
const getAllSales = async (req, res) => {
   try {
      const sales = await
         Sale
            .find({})
            .populate('customer', 'name')
            .lean()
            .exec()

      if (!sales || sales.length === 0) {
         return res.status(400).json({ message: 'No Sale Found!' })
      }
      res.json(sales)

   } catch (error) {
      return res.status(500).json({ message: 'Failed to Get Sales!', error })
   }
}

// @desc Delete Sale
// @route DELETE /sale/id
// @access Private
const deleteSale = async (req, res) => {
   try {
      const id = req.params.id

      const sale = await Sale.findById(id)
      if (!sale) {
         return res.status(400).json({ message: 'Sale Not Found!' })
      }

      deleteProductStock(sale)
      deleteAccountBalance(sale)

      const deletedSale = await Sale.findByIdAndDelete(id)

      if (deletedSale) {
         return res.status(201).json({ message: `Sale Successfully Deleted!` })
      } else {
         return res.status(400).json({ message: 'Failed to Delete Sale!' })
      }

   } catch (error) {
      return res.status(500).json({ message: 'Failed to Delete Sale!', error })
   }
}

// @desc Update Sale
// @route PUT /sale/id
// @access Private
const updateSale = async (req, res) => {
   try {
      const data = req.body

      const previousSale = await Sale.findById(data._id)
      if (!previousSale) {
         return res.status(400).json({ message: 'Sale Not Found!' })
      }

      const stockError = updateProductStock(data, previousSale)
      if (stockError) {
         return res.status(400).json({ message: stockError })
      }
      updateAccountBalance(data, previousSale)

      const updatedSale = await Sale.findByIdAndUpdate(data._id, data, { new: true })

      if (updatedSale) {
         return res.status(201).json({ message: `Sale Successfully Updated!` })
      } else {
         return res.status(400).json({ message: 'Failed to Update Sale!' })
      }
   } catch (error) {
      return res.status(500).json({ message: 'Failed to Update Sale!', error })
   }
}

export {
   addSale,
   getAllSales,
   deleteSale,
   updateSale
}