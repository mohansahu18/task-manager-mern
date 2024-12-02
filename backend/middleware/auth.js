import jwt from 'jsonwebtoken';
import { UserModel as User } from '../models/user.js';
import dotenv from "dotenv"
dotenv.config()
const JWT_SECRRET = process.env.JWT_SECRRET
export const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            console.log(req.headers.authorization);
            token = req.headers.authorization.split(' ')[1];
            console.log(token, "token");
            const decoded = jwt.verify(token, JWT_SECRRET);
            console.log(decoded, "decoded.......");
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

