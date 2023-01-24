import express from "express";
import { connectMongoDB } from "./utils/mongoose";
import ordersRoutes from "./routes/order"
import recipesRoutes from "./routes/recipe"

const app = express()
const PORT = 3001

app.use(express.json())

// routes can be proxy out for the api gateway
app.use("/api/orders", ordersRoutes)
app.use("/api/recipes", recipesRoutes)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
    connectMongoDB()
})

export default app