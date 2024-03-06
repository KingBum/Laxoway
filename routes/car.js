const express = require('express');
const router = express.Router();
const {Car} = require('../models')
const {verifyTokenWithAdmin} = require('../middleware/authMiddleware');


// Create a new car
router.post('/', verifyTokenWithAdmin , async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a specific car by ID
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a car by ID
router.put('/:id', verifyTokenWithAdmin, async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a car by ID
router.delete('/:id', verifyTokenWithAdmin, async (req, res) => {
    try {
        const car = await Car.findByIdAndRemove(req.params.id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
