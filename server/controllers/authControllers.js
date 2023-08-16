import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
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

        res.status(200).json({ message: 'Logged in Successfully!', userId: user._id, role: user.role, accessToken });

    } catch (error) {
        res.status(500).json({ message: 'Failed to Login!', error })
    }
};