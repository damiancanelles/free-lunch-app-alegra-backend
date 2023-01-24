"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("./utils/mongoose");
const order_1 = __importDefault(require("./routes/order"));
const recipe_1 = __importDefault(require("./routes/recipe"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
// routes can be proxy out for the api gateway
app.use("/api/orders", order_1.default);
app.use("/api/recipes", recipe_1.default);
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    (0, mongoose_1.connectMongoDB)();
});
