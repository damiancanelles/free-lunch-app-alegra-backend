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
exports.buyIngredient = void 0;
const axios_1 = __importDefault(require("axios"));
const ingredients_1 = require("../models/ingredients");
const SHOP_URL = "https://recruitment.alegra.com/api/farmers-market/buy";
const buyIngredient = (ingredient) => __awaiter(void 0, void 0, void 0, function* () {
    let purchasedIngredients = 0;
    while (purchasedIngredients < ingredient.amount) {
        const buy = yield axios_1.default.get(SHOP_URL, { params: { ingredient: ingredient.name } });
        const currentIngredient = yield ingredients_1.Ingredients.findOne({
            "name": ingredient.name
        });
        currentIngredient.amount += buy.data.quantitySold;
        currentIngredient.save();
        purchasedIngredients += buy.data.quantitySold;
    }
});
exports.buyIngredient = buyIngredient;
