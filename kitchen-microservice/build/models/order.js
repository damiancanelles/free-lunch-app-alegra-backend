"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: [true, 'status is required'],
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    recipe: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Recipe"
    }
});
exports.Order = mongoose_1.models.Order || (0, mongoose_1.model)('Order', orderSchema);
