import express from "express"
const router = express.Router()
import { addSale, getAllSales } from '../controllers/saleController.js'
import verifyJWT from '../middleware/verifyJWT.js'

router.use(verifyJWT)

router.route('/')
   .post(addSale)
   .get(getAllSales)
// .put(updatesale)

// router.route('/:id')
//    .delete(deletesale)

export default router