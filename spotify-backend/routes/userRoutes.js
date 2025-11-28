import express from 'express';
import User from '../models/userModel.js';


const router = express.Router();

// --- 1. POST /api/users - Naya User Add karna 
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        // Security: Password field ko response se hata diya
        const { password, ...userWithoutPassword } = savedUser._doc; 
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// --- 2. GET /api/users - Saare Users Fetch karna (Admin Panel ke liye) ---
router.get('/', async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
        res.json(users);
    } catch (error) {
        console.error("User fetch error:", error);
        res.status(500).json({ message: 'Failed to fetch users from database.' });
    }
});


// Yeh woh route hai jo Admin Panel ke 'Block' button ke liye zaruri hai.
router.put('/:id/block', async (req, res) => {
    try {
        const userId = req.params.id;
        const { block } = req.body; 
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isBlocked: block },
            { new: true } 
        ).select('-password'); 

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const status = block ? 'blocked' : 'unblocked';
        res.json({ message: `User successfully ${status}`, user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// --- 4. DELETE /api/users/:id - User Remove karna ---
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await User.findByIdAndDelete(userId);
        
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;