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
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("./utils/mongoose");
const ingredients_1 = __importDefault(require("./routes/ingredients"));
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const order_1 = require("./services/order");
callback_api_1.default.connect(process.env.RABBITMQ_URL || "amqps://ctifjxnq:htlSe0cIDf96LfnFSHxQ0xrsbYITOcH_@moose.rmq.cloudamqp.com/ctifjxnq", (error0, connection) => {
    if (error0)
        throw error0;
    connection.createChannel((error1, channel) => {
        if (error1)
            throw error1;
        channel.assertQueue("order_created");
        channel.consume("order_created", (msg) => __awaiter(void 0, void 0, void 0, function* () {
            if (msg !== null) {
                const order = JSON.parse(msg.content.toString());
                const availability = yield (0, order_1.checkAvailability)(order.recipe.ingredients);
                if (!availability) {
                    yield (0, order_1.buyIngredients)(order.recipe.ingredients);
                    yield (0, order_1.takeIngredients)(order.recipe.ingredients);
                    channel.assertQueue("order_completed");
                    channel.sendToQueue("order_completed", Buffer.from(order._id));
                }
                else {
                    yield (0, order_1.takeIngredients)(order.recipe.ingredients);
                    channel.assertQueue("order_completed");
                    channel.sendToQueue("order_completed", Buffer.from(order._id));
                }
                channel.ack(msg);
            }
        }));
        const app = (0, express_1.default)();
        const PORT = process.env.PORT || 3002;
        app.use(express_1.default.json());
        app.use("/api/ingredients", ingredients_1.default);
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
            (0, mongoose_1.runDB)();
        });
    });
});
