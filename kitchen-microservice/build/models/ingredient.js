"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
const mongoose_1 = require("mongoose");
const ingredientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
});
exports.Ingredient = mongoose_1.models.Ingredient || (0, mongoose_1.model)('Ingredient', ingredientSchema);
