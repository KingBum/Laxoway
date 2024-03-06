const express = require('express');
const router = express.Router();
const { Booking, Trip, User } = require('../models');
const { verifyToken, verifyTokenWithAdmin } = require('../middleware/authMiddleware');

// Create a new booking
router.post('/', async (req, res) => {
    try {
        const { tripId, seatIds, offer, service, totalPrice, userOption } = req.body;

        // Kiểm tra xem chuyến đi và chỗ ngồi có tồn tại không
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        const seats = trip.availableSeats.map(seat => seat._id.toString());
        const invalidSeats = seatIds.filter(seatId => !seats.includes(seatId));
        if (invalidSeats.length > 0) {
            return res.status(400).json({ error: 'Invalid seat IDs' });
        }

        // Kiểm tra xem chỗ ngồi đã được đặt chưa
        const alreadyBookedSeats = trip.availableSeats.filter(seat => seatIds.includes(seat._id.toString()) && seat.isBooked);
        if (alreadyBookedSeats.length > 0) {
            return res.status(400).json({ error: 'One or more selected seats are already booked' });
        }

        // Tạo booking mới
        const userId = req.userId; // Lấy thông tin người dùng từ token
        const booking = new Booking({
            user: userId, trip: tripId, numberOfSeats: seatIds, offer: offer,
            service: service,
            userOption: userOption,
            totalPrice: totalPrice
        });
        trip.bookings.push(booking);
        await booking.save();

        // Cập nhật trạng thái chỗ ngồi đã được đặt
        trip.availableSeats.forEach(seat => {
            if (seatIds.includes(seat._id.toString())) {
                seat.isBooked = true;
            }
        });
        await trip.save();

        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all bookings
router.get('/', verifyTokenWithAdmin, async (req, res) => {
    try {
        const userId = req.userId; // Lấy thông tin người dùng từ token
        const bookings = await Booking.find({ user: userId }).populate('trip').populate('user').populate('offer').populate('menu');
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a specific booking by ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.userId;
        const booking = await Booking.findOne({ _id: req.params.id, user: userId }).populate({
            path: 'trip',
            populate: {
                path: 'car',
                model: 'Car',
            },
            populate: {
                path: 'route',
                model: 'Route',
            },
        }).populate('user').populate('offer').populate({
            path: 'service.menu',
            model: 'Menu'
        });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Lấy thông tin chi tiết về chỗ ngồi
        const trip = await Trip.findById(booking.trip);
        const seatsInfo = trip.availableSeats.filter(seat => booking.numberOfSeats.includes(seat._id.toString()));

        // Thêm thông tin chi tiết về chỗ ngồi vào booking
        booking.numberOfSeats = seatsInfo;

        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Update a booking by ID
router.put('/:id', verifyTokenWithAdmin, async (req, res) => {
    try {
        const userId = req.userId; // Lấy thông tin người dùng từ token
        const booking = await Booking.findOne({ _id: req.params.id, user: userId });
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        const { seatIds } = req.body;

        // Kiểm tra xem chỗ ngồi đã được đặt chưa
        const trip = await Trip.findById(booking.trip);
        const alreadyBookedSeats = trip.availableSeats.filter(seat => seatIds.includes(seat._id.toString()) && seat.isBooked);
        if (alreadyBookedSeats.length > 0) {
            return res.status(400).json({ error: 'One or more selected seats are already booked' });
        }

        // Huỷ đặt chỗ cũ
        trip.availableSeats.forEach(seat => {
            if (booking.numberOfSeats.includes(seat._id.toString())) {
                seat.isBooked = false;
            }
        });

        // Cập nhật thông tin booking mới
        booking.numberOfSeats = seatIds;
        await booking.save();

        // Cập nhật trạng thái chỗ ngồi mới
        trip.availableSeats.forEach(seat => {
            if (seatIds.includes(seat._id.toString())) {
                seat.isBooked = true;
            }
        });
        await trip.save();

        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a booking by ID
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.userId; // Lấy thông tin người dùng từ token
        const booking = await Booking.findOne({ _id: req.params.id, user: userId });
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Huỷ đặt chỗ
        const trip = await Trip.findById(booking.trip);
        trip.availableSeats.forEach(seat => {
            if (booking.numberOfSeats.includes(seat._id.toString())) {
                seat.isBooked = false;
            }
        });

        const index = trip.bookings.indexOf(booking._id);
        trip.bookings.splice(index, 1);
        await trip.save();

        // Xoá booking
        await Booking.findByIdAndDelete(req.params.id);

        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
