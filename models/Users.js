const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, default: "" },
        avatar: { type: String, default: "" },
        coverAvatar: { type: String, default: "" },
        isAdmin: { type: Boolean, default: false },
        bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", UserSchema)