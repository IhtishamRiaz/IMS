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

const updateProductStock = async (data) => {
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

const updateAccountBalance = async (data) => {
   const account = await Account.findById(data.customer)
   account.balance = account.balance + data.grandTotal
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

      const stockError = await updateProductStock(data)
      if (stockError) {
         return res.status(400).json({ message: stockError })
      }

      updateAccountBalance(data)

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

export {
   addSale,
   getAllSales
}