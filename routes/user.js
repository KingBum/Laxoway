const express = require('express');
const router = express.Router();
const {Users} = require('../models')

const {verifyToken , verifyTokenWithAdmin} = require('../middleware/authMiddleware');

// Get User
router.get('/', verifyToken, async (req, res) => {
    try {
        // Lấy thông tin người dùng từ cơ sở dữ liệu dựa trên ID
        const user = await Users.findById(req.userId);

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const {password, ...others} = user._doc
        res.status(200).json(
            others
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/test', verifyTokenWithAdmin, async (req, res) => {
    try {
        // Lấy thông tin người dùng từ cơ sở dữ liệu dựa trên ID
        const user = await Users.findById(req.userId);

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const {password, ...others} = user._doc
        res.status(200).json(
            others
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
