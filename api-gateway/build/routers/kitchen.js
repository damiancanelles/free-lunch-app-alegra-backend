"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiAdapter_1 = require("../utils/apiAdapter");
const router = express_1.default.Router();
const BASE_URL = 'http://kitchen-microservice:3001/api';
const api = (0, apiAdapter_1.apiAdapter)(BASE_URL);
router.get("/orders/", (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data);
    });
});
router.get("/recipes/", (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data);
    });
});
exports.default = router;
