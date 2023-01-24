"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsAmount = void 0;
const mongoose_1 = require("mongoose");
const ingredientamountSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
    },
    ingredient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Ingredients",
        default: []
    }
});
exports.IngredientsAmount = mongoose_1.models.IngredientsAmount || (0, mongoose_1.model)('IngredientsAmount', ingredientamountSchema);
