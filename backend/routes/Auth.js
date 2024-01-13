import express from 'express';;
import User from '../models/User.js';

const router = express.Router();

// SIGNUP
router.post('/register', async (req, res) => {
    try {
        const validUsername = await User.findOne({ email: req.body.email });

        if (validUsername) {
            return res.status(400).json({
                success: false,
                message: 'Email đã tồn tại'
            })
        }
        
        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        res.status(200).json({
            success: true, 
            message: 'Đăng kí thành công', 
            data: savedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})


// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                success: false, 
                message: 'Email không chính xác', 
            })
        }

        const passwordValid = user.password === req.body.password;

        if (!passwordValid)(
            res.status(403).json({
                success: false, 
                message: 'Mật khẩu không chính xác', 
            })
        )
        else {
            res.status(200).json({ 
                success: true, 
                message: 'Đăng nhập thành công', 
                data: user
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})


export default router;