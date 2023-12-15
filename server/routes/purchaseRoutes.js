import express from "express"
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js'
import { addPurchase, getAllPurchases, deletePurchase } from '../controllers/purchaseControllers.js'

router.use(verifyJWT);

router.route('/')
   .post(addPurchase)
   .get(getAllPurchases)
// .put(updatePurchase)

router.route('/:id')
   .delete(deletePurchase)

export default router