import { Purchase } from '../models/purchaseModel.js'
import { Product } from '../models/productModel.js'
import { Account } from '../models/accountModel.js'
import { validateNewPurchase } from '../validations/purchaseValidation.js'

const getNextPurchaseId = async () => {
   const maxPurchase = await Purchase.findOne({}, {}, { sort: { purchaseId: -1 } });
   if (maxPurchase) {
      return maxPurchase.purchaseId + 1;
   }
   return 1;
}

const removeIdFromItems = (data) => {
   data?.items?.map((item) => {
      delete item._id;
   })
}

// Adding product stock
const addProductStock = async (data) => {
   await Promise.all(
      data?.items?.map(async (item) => {
         const product = await Product.findById(item.product)
         product.stock = product.stock + item.totalQty
         await product.save()
      })
   )
}

// Deleting product stock
const deleteProductStock = async (data) => {
   await Promise.all(
      data?.items?.map(async (item) => {
         const product = await Product.findById(item.product)
         product.stock = product.stock - item.totalQty
         await product.save()
      })
   )
}

// Updating Product Stock
const updateProductStock = async (data, previousPurchase) => {
   deleteProductStock(previousPurchase)
   addProductStock(data)
}

// Adding Account Balance when adding Purchase
const addAccountBalance = async (data) => {
   const account = await Account.findById(data.supplier)
   account.balance = account.balance - data.grandTotal
   await account.save()
}

// Deleting Account Balance when deleting Purchase
const deleteAccountBalance = async (data) => {
   const account = await Account.findById(data.supplier)
   account.balance = account.balance + data.grandTotal
   await account.save()
}

// Updating Account Balance when updating Purchase
const updateAccountBalance = async (data, previousPurchase) => {
   const account = await Account.findById(data.supplier)
   account.balance = account.balance + previousPurchase.grandTotal - data.grandTotal
   await account.save()
}

// @desc Add new Purchase
// @route POST /purchase
// @access Private
const addPurchase = async (req, res) => {
   try {
      // // Validating incoming data
      // const { error } = validateNewPurchase(req.body);
      // if (error) {
      //    return res.status(400).json({ message: error.details[0].message });
      //    return res.status(400).json({ message: 'Validation failed', error: error });
      // }

      const data = req.body

      const nextPurchaseId = await getNextPurchaseId();
      data.purchaseId = nextPurchaseId

      removeIdFromItems(data)

      const purchase = await Purchase.create(data)

      addProductStock(data)
      addAccountBalance(data)

      if (purchase) {
         return res.status(201).json({ message: `New Purchase Added!` })
      } else {
         return res.status(400).json({ message: 'Failed to Add Purchase!' })
      }
   }
   catch (error) {
      return res.status(500).json({ message: 'Failed to Add Purchase!', error })
   }
}

// @desc Get all Purchases
// @route GET /purchase
// @access Private
const getAllPurchases = async (req, res) => {
   try {
      const purchases = await
         Purchase
            .find({})
            .populate('supplier', 'name')
            .lean()
            .exec()

      if (!purchases || purchases.length === 0) {
         return res.status(400).json({ message: 'No Purchase Found!' })
      }
      res.json(purchases)

   } catch (error) {
      return res.status(500).json({ message: 'Failed to Get Purchases!', error })
   }
}

// @desc Delete Purchase
// @route DELETE /purchase/id
// @access Private
const deletePurchase = async (req, res) => {
   try {
      const id = req.params.id

      const purchase = await Purchase.findById(id)
      if (!purchase) {
         return res.status(400).json({ message: 'Purchase Not Found!' })
      }

      deleteProductStock(purchase)
      deleteAccountBalance(purchase)

      const deletedPurchase = await Purchase.findByIdAndDelete(id)

      if (deletedPurchase) {
         return res.status(201).json({ message: `Purchase Successfully Deleted!` })
      } else {
         return res.status(400).json({ message: 'Failed to Delete Purchase!' })
      }

   } catch (error) {
      return res.status(500).json({ message: 'Failed to Delete Purchase!', error })
   }
}

// @desc Update Purchase
// @route PUT /purchase/id
// @access Private
const updatePurchase = async (req, res) => {
   try {
      const data = req.body

      const previousPurchase = await Purchase.findById(data._id)
      if (!previousPurchase) {
         return res.status(400).json({ message: 'Purchase Not Found!' })
      }

      removeIdFromItems(data)

      updateAccountBalance(data, previousPurchase)
      updateProductStock(data, previousPurchase)

      const updatedPurchase = await Purchase.findByIdAndUpdate(data._id, data, { new: true })

      if (updatedPurchase) {
         return res.status(201).json({ message: `Purchase Successfully Updated!` })
      } else {
         return res.status(400).json({ message: 'Failed to Update Purchase!' })
      }
   } catch (error) {
      return res.status(500).json({ message: 'Failed to Update Purchase!', error })
   }
}

export {
   addPurchase,
   getAllPurchases,
   deletePurchase,
   updatePurchase
}