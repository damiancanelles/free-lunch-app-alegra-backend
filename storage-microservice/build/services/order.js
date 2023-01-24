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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyIngredients = exports.takeIngredients = exports.checkAvailability = void 0;
const ingredients_1 = require("../models/ingredients");
const axios_1 = __importDefault(require("axios"));
const buyIngredient = (ingredient) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("https://recruitment.alegra.com/api/farmers-market/buy", { params: { ingredient: ingredient } });
    return response.data.quantitySold;
});
const buyIngredientAmount = (ingredient, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const totalBrought = yield buyIngredient(ingredient);
    const currentIngredient = yield ingredients_1.Ingredients.findOne({
        "name": ingredient
    });
    currentIngredient.amount += totalBrought;
    yield currentIngredient.save();
    if (totalBrought < amount) {
        buyIngredientAmount(ingredient, amount - totalBrought);
    }
});
const checkAvailability = (ingredients) => __awaiter(void 0, void 0, void 0, function* () {
    let availability = true;
    yield Promise.all(ingredients.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
        const currentIngredient = yield ingredients_1.Ingredients.findOne({
            "name": ingredient.name
        });
        if (currentIngredient.amount < ingredient.amount) {
            availability = false;
        }
    })));
    return availability;
});
exports.checkAvailability = checkAvailability;
const takeIngredients = (ingredients) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(ingredients.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
        const currentIngredient = yield ingredients_1.Ingredients.findOne({
            "name": ingredient.name
        });
        currentIngredient.amount -= ingredient.amount;
        currentIngredient.save();
    })));
});
exports.takeIngredients = takeIngredients;
const buyIngredients = (ingredients) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(ingredients.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
        const currentIngredient = yield ingredients_1.Ingredients.findOne({
            "name": ingredient.name
        });
        const amount = currentIngredient.amount - ingredient.amount;
        yield buyIngredientAmount(ingredient.name, amount);
    })));
});
exports.buyIngredients = buyIngredients;
