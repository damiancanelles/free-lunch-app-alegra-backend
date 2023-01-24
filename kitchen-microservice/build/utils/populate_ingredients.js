"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./mongoose");
const ingredients_1 = require("./seed_data/ingredients");
const ingredient_1 = require("../models/ingredient");
(0, mongoose_1.runDB)();
ingredients_1.ingredients.map((ingredient) => {
    ingredient_1.Ingredient.create({
        "name": ingredient.name
    });
});
