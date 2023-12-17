import express from "express"
const router = express.Router()
import { addSale, getAllSales, deleteSale, updateSale } from '../controllers/saleController.js'
import verifyJWT from '../middleware/verifyJWT.js'

router.use(verifyJWT)

router.route('/')
   .post(addSale)
   .get(getAllSales)
   .put(updateSale)

router.route('/:id')
   .delete(deleteSale)

export default router