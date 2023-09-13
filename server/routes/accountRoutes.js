import express from "express"
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js'
import { addAccount, getAllAccounts, deleteAccount, updateAccount, addAccountType, getAllAccountTypes, deleteAccountType } from '../controllers/accountController.js'

router.use(verifyJWT);

router.route('/')
  .post(addAccount)
  .get(getAllAccounts)
  .put(updateAccount)

router.route('/:id')
  .delete(deleteAccount)

router.route('/type')
  .post(addAccountType)
  .get(getAllAccountTypes)

router.route('/type:id')
  .delete(deleteAccountType)

export default router
