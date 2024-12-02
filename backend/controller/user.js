import jwt from 'jsonwebtoken';
import { UserModel as User } from '../models/user.js';
import 'dotenv/config'

const JWT_SECRRET = process.env.JWT_SECRRET

export const userController = {

    registerUser: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = new User({ username, password });
            await user.save();
            const token = jwt.sign({ id: user._id }, JWT_SECRRET);
            res.status(201).json({ token });
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    },

    loginUser: async (req, res) => {
        console.log("iside login controller");
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (user && (await user.matchPassword(password))) {
                const token = jwt.sign({ id: user._id }, JWT_SECRRET);
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
}

