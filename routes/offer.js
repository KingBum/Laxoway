const express = require('express');
const router = express.Router();
const { Offer } = require('../models');
const { verifyTokenWithAdmin } = require('../middleware/authMiddleware');

// Create a new offer
router.post('/', verifyTokenWithAdmin, async (req, res) => {
    try {
        const offer = new Offer(req.body);
        await offer.save();
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all offers
router.get('/', async (req, res) => {
    try {
        const offers = await Offer.find();
        res.json(offers);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const offer = await Offer.findOne({ code });
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.json(offer);
    } catch (error) {
        console.error('Error searching offer:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update an offer by ID
router.put('/:id', verifyTokenWithAdmin, async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        if (!offer) {
            return res.status(404).json({ error: 'Offer not found' });
        }
        res.json(offer);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete an offer by ID
router.delete('/:id', verifyTokenWithAdmin, async (req, res) => {
    try {
        const offer = await Offer.findByIdAndRemove(req.params.id);
        if (!offer) {
            return res.status(404).json({ error: 'Offer not found' });
        }
        res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
