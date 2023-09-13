import express from "express"
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js'

router.use(verifyJWT);

router.route('/')
  .post()
  .get()
  .put()

router.route('/:id')
  .delete()

export default router