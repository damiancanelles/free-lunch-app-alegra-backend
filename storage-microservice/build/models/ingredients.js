"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredients = void 0;
const mongoose_1 = require("mongoose");
const ingredientSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    amount: {
        type: Number,
    }
});
exports.Ingredients = mongoose_1.models.Ingredients || (0, mongoose_1.model)('Ingredients', ingredientSchema);
