import express from "express"
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js'
import { addAccount, getAllAccounts, deleteAccount, updateAccount } from '../controllers/accountController.js'

// router.use(verifyJWT);

router.route('/')
  .post(addAccount)
  .get(getAllAccounts)
  .patch(updateAccount)
  .delete(deleteAccount)

export default router
