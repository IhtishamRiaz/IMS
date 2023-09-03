import express from "express";
const router = express.Router();
import verifyJWT from '../middleware/verifyJWT.js';
import { addArea, getAllAreas, addCity, getAllCities } from '../controllers/addressController.js';

router.use(verifyJWT);

router.route('/city')
  .post(addCity)
  .get(getAllCities)
  .delete()

router.route('/area')
  .post(addArea)
  .get(getAllAreas)
  .delete()

export default router;