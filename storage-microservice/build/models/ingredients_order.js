"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsOrder = void 0;
const mongoose_1 = require("mongoose");
const ingredientOrderSchema = new mongoose_1.Schema({
    external_id: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    ingredients: [{
            type: Object,
        }]
});
exports.IngredientsOrder = mongoose_1.models.IngredientsOrder || (0, mongoose_1.model)('IngredientsOrder', ingredientOrderSchema);
