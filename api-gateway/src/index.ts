import cors from "cors";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";

const app = express()
const PORT = 3000
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3003',
}

app.use(express.json())
app.use(cors(corsOptions))

// logs
app.use(morgan('tiny'))

// proxy to storage microservice
app.use('/api/ingredients', createProxyMiddleware({ target: process.env.STORAGE_URL || 'http://localhost:3002', changeOrigin: true }));

// proxy to kitchen microservice
app.use('/api/orders', createProxyMiddleware({ target: process.env.KITCHEN_URL || 'http://localhost:3001', changeOrigin: true }));
app.use('/api/recipes', createProxyMiddleware({ target: process.env.KITCHEN_URL || 'http://localhost:3001', changeOrigin: true }));

app.listen(PORT, () => {    
    console.log(`server running on port ${PORT}`)
})
