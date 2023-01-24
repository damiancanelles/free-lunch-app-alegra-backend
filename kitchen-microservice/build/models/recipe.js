"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'name is required']
    },
    ingredients: [{
            type: Object,
            default: []
        }]
});
exports.Recipe = mongoose_1.models.Recipe || (0, mongoose_1.model)('Recipe', recipeSchema);
