const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    noNumber: { type: String, required: true, unique : true },
    seats: {type : Array, required: true},
});

module.exports = mongoose.model('Car', carSchema);
