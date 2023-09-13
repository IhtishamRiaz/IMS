import express from "express"
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js'
import { addProduct, getAllProducts, updateProduct, deleteProduct, addProductCategory, getAllProductCategories, deleteProductCategory } from '../controllers/productControllers.js'

router.use(verifyJWT);

router.route('/')
  .post(addProduct)
  .get(getAllProducts)
  .put(updateProduct)

router.route('/:id')
  .delete(deleteProduct)

router.route('/category')
  .post(addProductCategory)
  .get(getAllProductCategories)

router.route('/category:id')
  .delete(deleteProductCategory)

export default router