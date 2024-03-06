const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userOption: { type : Object},
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
    service: { type : Object},
    status: { type: String, default: "Processing" },
    totalPrice : {type : Number},
    numberOfSeats: { type: Array, required: true },
}, {timestamps : true});

module.exports = mongoose.model('Booking', bookingSchema);