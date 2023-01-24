import express from "express";
import { runDB } from "./utils/mongoose";
import ingredientsRoutes from "./routes/ingredients"
import amqplib from "amqplib/callback_api"
import { buyIngredients, checkAvailability, takeIngredients } from "./services/order";

amqplib.connect(process.env.RABBITMQ_URL || "amqps://ctifjxnq:htlSe0cIDf96LfnFSHxQ0xrsbYITOcH_@moose.rmq.cloudamqp.com/ctifjxnq", (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
        if (error1) throw error1;

        channel.assertQueue("order_created")

        channel.consume("order_created",async (msg) => {
            if (msg !== null) {
                const order = JSON.parse(msg.content.toString())
                const availability = await checkAvailability(order.recipe.ingredients)
                if (!availability) {
                    await buyIngredients(order.recipe.ingredients)
                    await takeIngredients(order.recipe.ingredients)
                    channel.assertQueue("order_completed")
                    channel.sendToQueue("order_completed", Buffer.from(order._id));
                }
                else {
                    await takeIngredients(order.recipe.ingredients)
                    channel.assertQueue("order_completed")
                    channel.sendToQueue("order_completed", Buffer.from(order._id));
                }
                channel.ack(msg);
            }
        }
    )
})})

const app = express()
const PORT = 3002;

app.use(express.json())
app.use("/api/ingredients", ingredientsRoutes)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
    runDB()
})

export default app