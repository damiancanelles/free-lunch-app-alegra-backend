import { randomInt } from "crypto";
import express from "express";
import { Order } from "../models/order";
import { Recipe } from "../models/recipe";
import amqplib from "amqplib/callback_api"
import { completeOrder } from "../services/order";

const router = express.Router()

amqplib.connect(process.env.RABBITMQ_URL || "amqps://ctifjxnq:htlSe0cIDf96LfnFSHxQ0xrsbYITOcH_@moose.rmq.cloudamqp.com/ctifjxnq", (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
        if (error1) throw error1;

        channel.assertQueue("order_completed")

        channel.consume("order_completed", (msg) => {
            if (msg !== null) {
                const external_id = msg.content.toString()
                completeOrder(external_id)
                channel.ack(msg);
            }
        }
    )

    router.get("/", async (_req, res) => {
        const orders = await Order.find().populate({ path: 'recipe', model: Recipe })
        res.json(orders).status(200)
    })

    router.get("/create", async (_req, res) => {
        const recipes = await Recipe.find({})
        const number = randomInt(0,6)
        const order = await Order.create({
            "recipe": recipes[number]._id
        })
        const newOrder = await Order.findById(order._id).populate({ path: 'recipe', model: Recipe })

        connection.createChannel((error2, channel) => {
            if (error2) throw error2;
    
            channel.assertQueue("order_created")
    
            channel.sendToQueue("order_created", Buffer.from(JSON.stringify(newOrder)));
        })

        res.json(newOrder).status(200)
    })
})})

export default router