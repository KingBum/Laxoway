const express = require('express');
const router = express.Router();
const { Menu } = require('../models');
const { verifyTokenWithAdmin } = require('../middleware/authMiddleware');

// Create a new menu
router.post('/', verifyTokenWithAdmin, async (req, res) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();
        res.status(200).json(menu);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all menus
router.get('/', async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a specific menu by ID
router.get('/:id', async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a menu by ID
router.put('/:id', verifyTokenWithAdmin, async (req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        if (!menu) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a menu by ID
router.delete('/:id', verifyTokenWithAdmin, async (req, res) => {
    try {
        const menu = await Menu.findByIdAndRemove(req.params.id);
        if (!menu) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        res.json({ message: 'Menu deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
