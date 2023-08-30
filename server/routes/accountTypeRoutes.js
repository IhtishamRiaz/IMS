import express from "express"
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js';
import { addAccountType, getAllAccountTypes, deleteAccountType } from "../controllers/accountTypeController.js"

router.use(verifyJWT);

router.route('/')
  .post(addAccountType)
  .get(getAllAccountTypes)
  .delete(deleteAccountType)

export default router