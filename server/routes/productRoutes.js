import express from "express"
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js'
import { addProduct, getAllProducts, updateProduct, deleteProduct, addProductCategory, getAllProductCategories, deleteProductCategory, addPackingType, getAllPackingTypes, deletePackingType } from '../controllers/productControllers.js'

router.use(verifyJWT);

router.route('/')
  .post(addProduct)
  .get(getAllProducts)
  .put(updateProduct)

router.route('/:id')
  .delete(deleteProduct)

// Product Category Routes
router.route('/category')
  .post(addProductCategory)
  .get(getAllProductCategories)

router.route('/category:id')
  .delete(deleteProductCategory)

// Packing Type Routes
router.route('/packingType')
  .post(addPackingType)
  .get(getAllPackingTypes)

router.route('/packingType:id')
  .delete(deletePackingType)

export default router