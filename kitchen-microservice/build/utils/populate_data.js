"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_1 = require("../models/recipe");
const mongoose_1 = require("./mongoose");
const recipes_1 = require("./seed_data/recipes");
(0, mongoose_1.connectMongoDB)();
recipes_1.recipes.map((recipe) => {
    recipe_1.Recipe.create({
        "name": recipe.name,
        "ingredients": recipe.ingredients
    });
});
