import express from "express";
import { login } from "../controllers/authControllers.js";

const router = express.Router();


// Login Route
router.post('/login', login);


router.route('/')
    .post()

router.route('/refresh')
    .get()

router.route('/logout')
    .post()

export default router;