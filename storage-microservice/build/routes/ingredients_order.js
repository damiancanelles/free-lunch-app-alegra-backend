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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const ingredients_order_1 = require("../models/ingredients_order");
const ingredients_order_2 = require("../services/ingredients_order");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ingredients, external_id } = req.body;
    const order = yield ingredients_order_1.IngredientsOrder.create({ ingredients, external_id });
    const check = yield (0, ingredients_order_2.checkIngredients)(ingredients);
    if (!check) {
        console.log("not available");
        res.json(order).status(200);
        console.log("hello from after the res");
        yield (0, ingredients_order_2.buyTakeIngredients)(ingredients);
        const response = yield axios_1.default.get(`http://localhost:3001/api/complete/order/${external_id}`);
        if (response.status == 200) {
            order.status = "completed";
            order.save();
        }
    }
    else {
        console.log("products are available");
        yield (0, ingredients_order_2.takeIngredients)(ingredients);
        order.status = "completed";
        order.save();
        res.json(order).status(200);
    }
}));
exports.default = router;
