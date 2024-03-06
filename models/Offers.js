const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // Mã code giảm giá, là duy nhất
    discountPercentage: { type: Number, required: true }, // Phần trăm giảm giá
    maxDiscountAmount: { type: Number }, // Số tiền giảm tối đa (nếu có)
    validFrom: { type: Date, required: true }, // Ngày bắt đầu hiệu lực của mã giảm giá
    validUntil: { type: Date, required: true }, // Ngày kết thúc hiệu lực của mã giảm giá
    description: { type: String } // Mô tả về mã giảm giá (nếu có)
});

// Tạo index với thuộc tính expireAfterSeconds
offerSchema.index({ validUntil: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Offer', offerSchema);