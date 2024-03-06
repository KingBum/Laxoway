const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hub: { type: String, required: true }
});

const routeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    origin: { type: String, required: true },
    origin_hub: { type: String, required: true },
    option : [OptionSchema],
    dest: { type: String, required: true },
    dest_hub: { type: String, required: true },
});

module.exports = mongoose.model('Route', routeSchema);
