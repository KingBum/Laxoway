const express = require('express');
const router = express.Router();
const { Trip, Car } = require('../models');
const { verifyTokenWithAdmin } = require('../middleware/authMiddleware');

// Create a new trip
router.post('/', verifyTokenWithAdmin, async (req, res) => {
    try {
        const { route, departureTime, arrivalTime, car, price } = req.body;
        const carInfo = await Car.findById(car);
        const carSeats = carInfo.seats.map(seat => ({
            seatNumber: seat,
            isBooked: false, // Mặc định là chưa đặt chỗ
        }));

        // Tạo Trip với availableSeats dựa trên seats của Car
        const trip = new Trip({
            route,
            departureTime,
            arrivalTime,
            car,
            price,
            availableSeats: carSeats,
        });

        await trip.save();
        res.status(200).json(trip);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
});

// API endpoint để tạo ra các Trip tự động vào ngày hôm sau
router.post('/batch', verifyTokenWithAdmin, async (req, res) => {
    const { numberOfTripsToCreate } = req.body;

    try {
        // Lấy danh sách các Trip cuối cùng từ cơ sở dữ liệu
        const lastTrips = await Trip.find().sort({ departureTime: -1 }).limit(numberOfTripsToCreate);

         // Tạo các Trip mới bằng cách thêm 1 ngày vào departureTime và arrivalTime của lastTrips
         const newTrips = lastTrips.map(trip => {
            const newTrip = new Trip({
                route: trip.route,
                departureTime: new Date(trip.departureTime.getTime() + (24 * 60 * 60 * 1000)), // Thêm 1 ngày
                arrivalTime: new Date(trip.arrivalTime.getTime() + (24 * 60 * 60 * 1000)), // Thêm 1 ngày
                car: trip.car,
                price: trip.price,
                availableSeats: trip.availableSeats,
                bookings: []
            });

            return newTrip;
        });

        // Lưu các Trip mới vào cơ sở dữ liệu
        await Trip.insertMany(newTrips);

        res.status(201).json({ message: `${numberOfTripsToCreate} new trips created successfully.` });
    } catch (error) {
        res.status(500).json({ message: 'Error creating trips.', error: error.message });
    }
});

// Get all trips
// router.get('/', async (req, res) => {
//     try {
//         const trips = await Trip.find().populate('route').populate('car').populate('bookings').exec();
//         res.json(trips);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });

router.get('/', async (req, res) => {
    try {
        const { origin, dest, departureTime } = req.query;

        // Nếu người dùng không cung cấp origin, dest và departureTime, trả về toàn bộ danh sách Trip
        if (!origin && !dest && !departureTime) {
            const trips = await Trip.find()
                .populate('route')
                .populate('car')
                .populate('bookings')
                .exec();
            res.json(trips);
        } else {
            // Lấy tất cả các chuyến đi
            let trips = await Trip.find()
                .populate('route')
                .populate('car')
                .populate('bookings')
                .exec();

            // Lọc các chuyến đi dựa trên origin, dest và departureTime (nếu được cung cấp)
            if (origin) {
                trips = trips.filter(trip => trip.route.origin === origin);
            }
            if (dest) {
                trips = trips.filter(trip => trip.route.dest === dest);
            }
            if (departureTime) {
                const departureDate = new Date(departureTime);
                const filteredTrips = trips.filter(trip => {
                    const tripDepartureDate = new Date(trip.departureTime);
                    // So sánh ngày, tháng, năm
                    return tripDepartureDate.getFullYear() === departureDate.getFullYear() &&
                           tripDepartureDate.getMonth() === departureDate.getMonth() &&
                           tripDepartureDate.getDate() === departureDate.getDate();
                });
                trips = filteredTrips;
            }

            res.json(trips);
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});





// Get a specific trip by ID
router.get('/:id', async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('route').populate('car').populate('bookings').exec();
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json(trip);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a trip by ID
router.put('/:id', verifyTokenWithAdmin, async (req, res) => {
    try {
        const trip = await Trip.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json(trip);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a trip by ID
router.delete('/:id', verifyTokenWithAdmin, async (req, res) => {
    try {
        const trip = await Trip.findByIdAndRemove(req.params.id);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
