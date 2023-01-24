"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kitchen_1 = __importDefault(require("./kitchen"));
const storage_1 = __importDefault(require("./storage"));
const router = express_1.default.Router();
router.use(kitchen_1.default);
router.use(storage_1.default);
router.get("/", (_req, res) => {
    res.send("Hello Word");
});
exports.default = router;
