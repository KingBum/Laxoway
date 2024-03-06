const express = require('express');
const router = express.Router();
const {Route} = require('../models')

const { verifyTokenWithAdmin } = require('../middleware/authMiddleware');

// Create a new route
router.post('/', verifyTokenWithAdmin, async (req, res) => {
    try {
        const route = new Route(req.body);
        await route.save();
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all routes
router.get('/', async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a specific route by ID
router.get('/:id', async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) {
            return res.status(404).json({ error: 'Route not found' });
        }
        res.json(route);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a route by ID
router.put('/:id', verifyTokenWithAdmin, async (req, res) => {
    try {
        const route = await Route.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        if (!route) {
            return res.status(404).json({ error: 'Route not found' });
        }
        res.json(route);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a route by ID
router.delete('/:id', verifyTokenWithAdmin, async (req, res) => {
    try {
        const route = await Route.findByIdAndRemove(req.params.id);
        if (!route) {
            return res.status(404).json({ error: 'Route not found' });
        }
        res.json({ message: 'Route deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
