import express from "express";
import { register, login } from "../controllers/authControllers.js";

const router = express.Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);


router.route('/')
    .post()

router.route('/refresh')
    .get()

router.route('/logout')
    .post()

export default router;