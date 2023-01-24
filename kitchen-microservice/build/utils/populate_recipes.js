"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipes_1 = require("./seed_data/recipes");
const recipe_1 = require("../models/recipe");
const mongoose_1 = require("./mongoose");
const ingredient_1 = require("../models/ingredient");
(0, mongoose_1.runDB)();
recipes_1.recipes.map((recipe) => __awaiter(void 0, void 0, void 0, function* () {
    const idList = [];
    yield recipe.ingredients.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
        const currentIngredient = yield ingredient_1.Ingredient.findOne({
            "name": ingredient
        });
        idList.push(currentIngredient._id);
    }));
    const currentRecipe = yield recipe_1.Recipe.create({
        "name": recipe.name,
        "amounts": recipe.amounts
    });
    idList.map((id) => __awaiter(void 0, void 0, void 0, function* () {
        currentRecipe.ingredients.push(id);
        yield currentRecipe.save();
        console.log("Saved");
    }));
}));
