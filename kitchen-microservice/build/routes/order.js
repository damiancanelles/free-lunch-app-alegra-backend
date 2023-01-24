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
const crypto_1 = require("crypto");
const express_1 = __importDefault(require("express"));
const order_1 = require("../models/order");
const recipe_1 = require("../models/recipe");
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const order_2 = require("../services/order");
const router = express_1.default.Router();
callback_api_1.default.connect(process.env.RABBITMQ_URL || "amqp://localhost:5672", (error0, connection) => {
    if (error0)
        throw error0;
    connection.createChannel((error1, channel) => {
        if (error1)
            throw error1;
        channel.assertQueue("order_completed");
        channel.consume("order_completed", (msg) => {
            if (msg !== null) {
                const external_id = msg.content.toString();
                (0, order_2.completeOrder)(external_id);
                channel.ack(msg);
            }
        });
        router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield order_1.Order.find().populate({ path: 'recipe', model: recipe_1.Recipe });
            res.json(orders).status(200);
        }));
        router.get("/create", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const recipes = yield recipe_1.Recipe.find({});
            const number = (0, crypto_1.randomInt)(0, 6);
            const order = yield order_1.Order.create({
                "recipe": recipes[number]._id
            });
            const newOrder = yield order_1.Order.findById(order._id).populate({ path: 'recipe', model: recipe_1.Recipe });
            connection.createChannel((error2, channel) => {
                if (error2)
                    throw error2;
                channel.assertQueue("order_created");
                channel.sendToQueue("order_created", Buffer.from(JSON.stringify(newOrder)));
            });
            res.json(newOrder).status(200);
        }));
    });
});
exports.default = router;
