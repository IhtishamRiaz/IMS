import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import validateRegister from '../validations/registerValidator.js';
import validateLogin from '../validations/loginValidator.js';
import jwt from 'jsonwebtoken'

const generateAccessToken = (user) => {
    return jwt.sign({ userId: user._id, email: user.email, name: user.name, role: user.role }, process.env.ACCESS_SECRET_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
};

// const generateRefreshToken = (user) => {
//     return jwt.sign({ userId: user._id, email: user.email, name: user.name, role: user.role }, secret, {
//         expiresIn: refreshTokenExpiration,
//     });
// };

// Register
export const register = async (req, res) => {
    try {
        const { error } = validateRegister(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        };

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ message: 'User Already Exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })
        await newUser.save();

        res.status(201).json({ message: 'User Registered Successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Failed to Register User!', error });
    }
}

// Login
export const login = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }

        const accessToken = generateAccessToken(user);

        res.status(200).json({ message: 'Logged in Successfully!', userId: user._id, accessToken })

    } catch (error) {
        res.status(500).json({ message: 'Failed to Login!', error })
    }
};