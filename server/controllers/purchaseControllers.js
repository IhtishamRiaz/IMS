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

const updateProductStock = async (data) => {
   data?.items?.map(async (item) => {
      const product = await Product.findById(item.product)
      product.stock = product.stock + item.totalQty
      await product.save()
   })
}

const updateAccountBalance = async (data) => {
   const account = await Account.findById(data.supplier)
   account.balance = account.balance - data.grandTotal
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

      updateProductStock(data)
      updateAccountBalance(data)

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

export {
   addPurchase,
   getAllPurchases
}