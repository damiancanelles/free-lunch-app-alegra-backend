"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const PORT = 3000;
const corsOptions = {
    origin: 'http://localhost:3003',
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
// logs
app.use((0, morgan_1.default)('tiny'));
// proxy to storage microservice
app.use('/api/ingredients', (0, http_proxy_middleware_1.createProxyMiddleware)({ target: 'http://localhost:3002', changeOrigin: true }));
// proxy to kitchen microservice
app.use('/api/orders', (0, http_proxy_middleware_1.createProxyMiddleware)({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/api/recipes', (0, http_proxy_middleware_1.createProxyMiddleware)({ target: 'http://localhost:3001', changeOrigin: true }));
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
