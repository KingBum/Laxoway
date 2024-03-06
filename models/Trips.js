const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    price: { type: Number, required: true },
    availableSeats: [
        {
            seatNumber: { type: String },
            isBooked: { type: Boolean, default: false },
        }
    ],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
}, {expires : "8d"});

module.exports = mongoose.model('Trip', tripSchema);