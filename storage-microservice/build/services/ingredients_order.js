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
exports.buyTakeIngredients = exports.takeIngredients = exports.checkIngredients = void 0;
const ingredients_1 = require("../models/ingredients");
const ingredients_2 = require("./ingredients");
const checkIngredients = (ingredients) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {
        availability: true
    };
    yield Promise.all(ingredients.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
        const currentIngredient = yield ingredients_1.Ingredients.findOne({
            "name": ingredient.name
        });
        if (currentIngredient.amount < ingredient.amount) {
            response.availability = false;
        }
    })));
    console.log(response.availability);
    return response.availability;
});
exports.checkIngredients = checkIngredients;
const takeIngredients = (ingredients) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ingredients.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
            const currentIngredient = yield ingredients_1.Ingredients.findOne({
                "name": ingredient.name
            });
            currentIngredient.amount -= ingredient.amount;
            currentIngredient.save();
        }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.takeIngredients = takeIngredients;
const buyTakeIngredients = (ingredients) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ingredients.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("go to shopping");
            const currentIngredient = yield ingredients_1.Ingredients.findOne({
                "name": ingredient.name
            });
            if (currentIngredient.amount < ingredient.amount) {
                yield (0, ingredients_2.buyIngredient)({
                    "name": currentIngredient.name,
                    "amount": ingredient.amount - currentIngredient.amount
                });
                currentIngredient.amount -= ingredient.amount;
                currentIngredient.save();
            }
            else {
                currentIngredient.amount -= ingredient.amount;
                currentIngredient.save();
            }
        }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.buyTakeIngredients = buyTakeIngredients;
